// Smile Dental API — Express + MongoDB (native driver). See backend.md.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const { MongoClient, ObjectId } = require('mongodb')

// ---------- config ----------
const PORT = process.env.PORT || 5000
const isProd = process.env.NODE_ENV === 'production'
const FRONTEND_URLS = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

// Service prices — server is the source of truth for revenue. Keys match the
// booking dropdown in src/components/Appointment.jsx. (Mirrors Services.jsx pricing.)
const SERVICE_PRICES = {
  'Dental Implants': 40000,
  'Orthodontics & Braces': 40000,
  'Advanced Root Canal': 5000,
  'Cosmetic & Smile Design': 12000,
  'Crowns & Bridges': 12000,
  'Laser Whitening': 8000,
  'Kids Dentistry': 1000,
  'Fillings & Scaling': 1500,
  'General Checkup': 500,
}

// ---------- firebase ID token verification (public certs, no service account) ----------
// Verifies a Firebase ID token against Google's public x509 certs using only the
// project ID — no private key / firebase-admin needed.
const FIREBASE_CERTS_URL =
  'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
let certCache = { at: 0, certs: null }

async function googleCerts() {
  // ponytail: simple 1h time cache; Google rotates these slowly.
  if (certCache.certs && Date.now() - certCache.at < 60 * 60 * 1000) return certCache.certs
  const res = await fetch(FIREBASE_CERTS_URL)
  if (!res.ok) throw new Error('Could not fetch Google certs')
  certCache = { at: Date.now(), certs: await res.json() }
  return certCache.certs
}

async function verifyFirebaseToken(idToken) {
  const projectId = process.env.FIREBASE_PROJECT_ID
  if (!projectId) throw new Error('FIREBASE_PROJECT_ID not set')
  const decoded = jwt.decode(idToken, { complete: true })
  if (!decoded?.header?.kid) throw new Error('Malformed token')
  const cert = (await googleCerts())[decoded.header.kid]
  if (!cert) throw new Error('Unknown signing key')
  return jwt.verify(idToken, cert, {
    algorithms: ['RS256'],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  })
}

if (!process.env.FIREBASE_PROJECT_ID) {
  console.warn('⚠  FIREBASE_PROJECT_ID not set — /jwt will reject until configured.')
}

// ---------- app + middleware ----------
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
// On Vercel the API is served under /api/* on the same origin as the SPA. Strip the
// prefix so routes defined as /jwt, /users/me, ... still match. No-op in local dev.
app.use((req, _res, next) => {
  if (req.url === '/api') req.url = '/'
  else if (req.url.startsWith('/api/')) req.url = req.url.slice(4)
  next()
})
app.use(
  cors({
    origin: FRONTEND_URLS,
    credentials: true,
  }),
)

// Same-origin now (SPA + API share the Vercel domain) → plain lax: no cross-site
// 'none' needed, and lax keeps CSRF protection.
const cookieOpts = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax',
}

// ---------- database (cached connection — works locally + on Vercel) ----------
let db
let connecting
async function getDb() {
  if (db) return db
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set')
  if (!connecting) {
    const client = new MongoClient(process.env.MONGODB_URI)
    connecting = client.connect().then((c) => {
      db = c.db('smile_dental')
      return db
    })
  }
  return connecting
}
const users = async () => (await getDb()).collection('users')
const appointments = async () => (await getDb()).collection('appointments')

// ---------- auth middleware ----------
function verifyToken(req, res, next) {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

function requireRole(...roles) {
  return async (req, res, next) => {
    try {
      const me = await (await users()).findOne({ uid: req.user.uid })
      if (!me || !roles.includes(me.role)) return res.status(403).json({ message: 'Forbidden' })
      req.dbUser = me
      next()
    } catch (e) {
      next(e)
    }
  }
}
const verifyAdmin = requireRole('doctor', 'super-admin')
const verifySuperAdmin = requireRole('super-admin')

// ---------- auth routes ----------
// Verify Firebase ID token, upsert the user, issue our JWT cookie.
app.post('/jwt', async (req, res, next) => {
  try {
    const { idToken } = req.body
    if (!idToken) return res.status(400).json({ message: 'idToken required' })
    const decoded = await verifyFirebaseToken(idToken)
    const uid = decoded.user_id || decoded.sub
    const email = decoded.email
    const role = email === process.env.SUPER_ADMIN_EMAIL ? 'super-admin' : 'patient'

    const col = await users()
    // role goes in $set OR $setOnInsert, never both (Mongo rejects the path conflict).
    // super-admin: assert role on every login. others: set role only on insert so a
    // promoted doctor isn't downgraded to patient next time they log in.
    const setOnInsert = { uid, email, name: decoded.name || '', phone: '', createdAt: new Date() }
    const update = { $setOnInsert: setOnInsert }
    if (role === 'super-admin') update.$set = { role: 'super-admin' }
    else setOnInsert.role = 'patient'
    await col.updateOne({ uid }, update, { upsert: true })

    const token = jwt.sign({ uid, email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, cookieOpts).json({ ok: true })
  } catch (e) {
    next(e)
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('token', cookieOpts).json({ ok: true })
})

// ---------- user routes ----------
app.get('/users/me', verifyToken, async (req, res, next) => {
  try {
    const me = await (await users()).findOne({ uid: req.user.uid })
    if (!me) return res.status(404).json({ message: 'Not found' })
    res.json(me)
  } catch (e) {
    next(e)
  }
})

app.patch('/users/me', verifyToken, async (req, res, next) => {
  try {
    const { name, phone } = req.body
    await (await users()).updateOne({ uid: req.user.uid }, { $set: { name, phone } })
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

// super-admin: list users + promote to doctor
app.get('/users', verifyToken, verifySuperAdmin, async (req, res, next) => {
  try {
    res.json(await (await users()).find().sort({ createdAt: -1 }).toArray())
  } catch (e) {
    next(e)
  }
})

app.patch('/users/:id/role', verifyToken, verifySuperAdmin, async (req, res, next) => {
  try {
    const { role } = req.body
    if (!['patient', 'doctor'].includes(role)) return res.status(400).json({ message: 'Bad role' })
    await (await users()).updateOne({ _id: new ObjectId(req.params.id) }, { $set: { role } })
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

// ---------- doctor routes ----------
// public list for the Team section + booking dropdown
app.get('/doctors', async (req, res, next) => {
  try {
    const list = await (await users())
      .find({ role: 'doctor' })
      .project({ name: 1, specialty: 1, photoURL: 1, workingHours: 1, education: 1, experience: 1 })
      .toArray()
    res.json(list)
  } catch (e) {
    next(e)
  }
})

app.patch('/doctors/me', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { specialty, photoURL, workingHours, education, experience, name } = req.body
    await (await users()).updateOne(
      { uid: req.user.uid },
      { $set: { specialty, photoURL, workingHours, education, experience, ...(name ? { name } : {}) } },
    )
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

// ---------- appointment routes ----------
// public — guest or logged-in. Attach userUid only if a valid cookie is present.
app.post('/appointments', async (req, res, next) => {
  try {
    const { patientName, phone, email, doctorId, service, date } = req.body
    if (!patientName || !phone || !doctorId || !service || !date)
      return res.status(400).json({ message: 'Missing required fields' })

    // No bookings in the past — today or later only.
    if (date < new Date().toISOString().slice(0, 10))
      return res.status(400).json({ message: 'Please pick today or a future date.' })

    const doctor = await (await users()).findOne({ _id: new ObjectId(doctorId), role: 'doctor' })
    if (!doctor) return res.status(400).json({ message: 'Doctor not found' })

    // No exact-duplicate bookings: same name + phone + service + doctor.
    const dup = await (await appointments()).findOne({ patientName, phone, service, doctorId })
    if (dup)
      return res
        .status(409)
        .json({ message: 'You have already booked this service with this doctor under the same name and phone.' })

    let userUid = null
    if (req.cookies?.token) {
      try {
        userUid = jwt.verify(req.cookies.token, process.env.JWT_SECRET).uid
      } catch {
        /* treat as guest */
      }
    }

    // serial = this patient's place in line for that doctor on that day.
    // ponytail: count + 1 is fine at clinic scale; a near-simultaneous double
    // book could collide — add a unique index on {doctorId,date,serial} if it matters.
    const serial = (await (await appointments()).countDocuments({ doctorId, date })) + 1

    const appt = {
      patientName,
      phone,
      email: email || '',
      userUid,
      doctorId,
      doctorName: doctor.name,
      service,
      price: SERVICE_PRICES[service] ?? 0,
      date,
      serial,
      createdAt: new Date(),
    }
    const { insertedId } = await (await appointments()).insertOne(appt)
    res.status(201).json({ ...appt, _id: insertedId, workingHours: doctor.workingHours || '' })
  } catch (e) {
    next(e)
  }
})

app.get('/appointments/mine', verifyToken, async (req, res, next) => {
  try {
    const list = await (await appointments())
      .find({ userUid: req.user.uid })
      .sort({ date: -1 })
      .toArray()
    res.json(list)
  } catch (e) {
    next(e)
  }
})

app.get('/appointments/doctor', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const q = { doctorId: req.dbUser._id.toString() }
    if (req.query.date) q.date = req.query.date
    res.json(await (await appointments()).find(q).sort({ date: -1 }).toArray())
  } catch (e) {
    next(e)
  }
})

// mark an appointment done — scoped to the doctor's own appointments
app.patch('/appointments/:id/done', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    await (await appointments()).updateOne(
      { _id: new ObjectId(req.params.id), doctorId: req.dbUser._id.toString() },
      { $set: { done: true } },
    )
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

// last-7-day counts + revenue, plus today/all-time cards
app.get('/appointments/doctor/stats', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    // super-admin sees clinic-wide totals (every doctor); a doctor sees only their own.
    const filter = req.dbUser.role === 'super-admin' ? {} : { doctorId: req.dbUser._id.toString() }
    const all = await (await appointments()).find(filter).toArray()
    const today = new Date().toISOString().slice(0, 10)

    // ponytail: in-memory grouping is fine at clinic scale; switch to an
    // aggregation pipeline if appointment volume ever gets large.
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      const onDay = all.filter((a) => a.date === key)
      days.push({
        date: key,
        count: onDay.length,
        revenue: onDay.reduce((s, a) => s + (a.price || 0), 0),
      })
    }

    res.json({
      totalPatients: all.length,
      todayCount: all.filter((a) => a.date === today).length,
      totalRevenue: all.reduce((s, a) => s + (a.price || 0), 0),
      last7Days: days,
    })
  } catch (e) {
    next(e)
  }
})

// ---------- misc ----------
app.get('/', (req, res) => res.json({ service: 'Smile Dental API', ok: true }))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message || 'Server error' })
})

// local dev listens; Vercel imports the app
if (require.main === module) {
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))
}
module.exports = app
