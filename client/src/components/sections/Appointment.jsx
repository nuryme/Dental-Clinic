import { useEffect, useState } from 'react'
import { api } from '../../api.js'
import { useAuth } from '../../AuthContext.jsx'
import BookingConfirm from './BookingConfirm.jsx'

// Full-width "Request an Appointment" band. Posts to the backend; anyone can
// book (guest or logged-in). Logged-in bookings are linked to the account.
const services = [
  'Dental Implants',
  'Orthodontics & Braces',
  'Advanced Root Canal',
  'Cosmetic & Smile Design',
  'Crowns & Bridges',
  'Laser Whitening',
  'Kids Dentistry',
  'Fillings & Scaling',
  'General Checkup',
]

const field =
  'w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none transition focus:border-white focus:bg-white/15 [&>option]:text-ink'

export default function Appointment() {
  const { user } = useAuth()
  const [doctors, setDoctors] = useState([])
  const [confirmed, setConfirmed] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    api('/doctors')
      .then(setDoctors)
      .catch(() => setDoctors([]))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const f = e.target
    try {
      const appt = await api('/appointments', {
        method: 'POST',
        body: {
          patientName: f.name.value,
          phone: f.phone.value,
          email: user?.email || '',
          doctorId: f.doctorId.value,
          service: f.service.value,
          date: f.date.value,
        },
      })
      setConfirmed(appt)
      f.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="appointment" className="relative isolate overflow-hidden bg-brand py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/80 via-brand/65 to-ink/75" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div className="text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">Book a visit</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">Request an Appointment</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
            Pick your dentist, service and date. {user ? 'Your booking is saved to your account.' : 'Booking without an account works too — log in to keep a history.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/15 backdrop-blur-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required defaultValue={user?.name || ''} placeholder="Full name" className={field} />
            <input name="phone" required type="tel" defaultValue={user?.phone || ''} placeholder="Phone number" className={field} />
            <select name="doctorId" required className={field} defaultValue="">
              <option value="" disabled>
                {doctors.length ? 'Choose a doctor' : 'No doctors available yet'}
              </option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                  {d.specialty ? ` — ${d.specialty}` : ''}
                </option>
              ))}
            </select>
            <select name="service" className={field} defaultValue={services[0]}>
              {services.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <input name="date" required type="date" min={new Date().toISOString().slice(0, 10)} className={`${field} [color-scheme:dark] sm:col-span-2`} />
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 8v5M12 16h.01" />
              </svg>
              <span>{error}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
          >
            {busy ? 'Booking…' : 'Book appointment'}
          </button>
        </form>
      </div>

      <BookingConfirm appointment={confirmed} onClose={() => setConfirmed(null)} />
    </section>
  )
}
