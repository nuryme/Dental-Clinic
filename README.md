# Smile Dental — Aesthetic, Orthodontic & Implant Centre

🔗 **Live site:** https://dental-clinic-one-navy.vercel.app

A full-stack dental clinic web app: a patient-facing site with guest & account
booking, plus role-based dashboards for doctors, a cashier, and a super admin. Frontend and
backend deploy together as **one Vercel project** — the React app is served
statically and the Express API runs as a serverless function under `/api/*` on
the **same origin**, so the auth cookie stays first-party and `httpOnly`.

```
.
├── client/          # React + Vite + Tailwind v4 frontend
├── server/          # Express + MongoDB API (serverless on Vercel)
└── vercel.json      # builds both; routes /api/* → server, everything else → SPA
```

**Tech:** React 18 · Vite 6 · Tailwind CSS v4 · React Router 7 · Firebase Auth ·
Recharts · Express 4 · MongoDB 6 (native driver) · jsonwebtoken · Vercel

---

## What you can do

### As a visitor (no account needed)
- Browse the clinic site: services & pricing, team of doctors, reviews, about,
  and contact pages.
- View any doctor's detail page (specialty, education, experience, hours).
- **Book an appointment as a guest** — pick a doctor, service, and date. You get
  a confirmation with your serial number for that day. No sign-up required.

### As a registered patient
- Sign up / log in (Firebase auth).
- Book appointments tied to your account.
- **Patient dashboard:** see your full **booking history** — including each
  appointment's price and **Paid / Unpaid** status — and **update your profile**
  (name, phone).

### As a doctor
- **Doctor dashboard** with your own bookings — filter by date, mark an
  appointment **done**, and see each one's **Paid / Unpaid** status.
- Stats: total patients, today's count, **total revenue (paid appointments
  only)**, and a last-7-days chart (Recharts).
- **Manage your profile:** specialty, photo, working hours, education,
  experience — which feeds the public Team section and booking dropdown.

### As the cashier
- **Cashier dashboard → Patients:** every booking across **all** doctors, with a
  **date filter**, **search by name or email**, and an **All / Paid / Unpaid**
  filter. Patients pay in person — when they do, the cashier clicks **Mark paid**
  (toggle).
- Marking an appointment paid is what adds its price to that doctor's revenue, so
  no-shows who never pay never inflate the numbers.
- **Profile tab:** edit own name & phone.

### As the super admin
- **Manage Users:** see everyone and **promote a patient to a doctor or a
  cashier** (or revoke back to patient), and **delete** any user (a two-step
  confirm; super-admins can't be deleted).
- Clinic-wide stats across **all** doctors (revenue, patient counts, trends).

---

## Authentication & roles

- Users sign in on the frontend via **Firebase**. The client sends the Firebase
  ID token to `POST /jwt`; the server **verifies it against Google's public
  certs** (no service-account key needed), upserts the user, and issues an
  **httpOnly JWT cookie**.
- Four roles:
  - **patient** — default for any new sign-up.
  - **doctor** — a patient promoted by the super admin.
  - **cashier** — a patient promoted by the super admin; runs the payment desk.
  - **super-admin** — whoever logs in with `SUPER_ADMIN_EMAIL`; asserted on every
    login. Promotions never get clobbered: a doctor stays a doctor on next login.
- Routes are guarded client-side by `ProtectedRoute` and enforced again on the
  server. The server is also the **source of truth for pricing and revenue**
  (service prices live on the server, not the client).

---

## API endpoints

### Auth
- `POST /jwt` — verify Firebase token, upsert user, set JWT cookie.
- `GET /logout` — clear the cookie.

### Users / profile
- `GET /users/me` — current user.
- `PATCH /users/me` — update own name & phone.
- `GET /users` *(super-admin)* — list all users.
- `PATCH /users/:id/role` *(super-admin)* — promote/demote between patient, doctor, and cashier.
- `DELETE /users/:id` *(super-admin)* — delete a user (a super-admin can't be deleted).

### Doctors
- `GET /doctors` — public list for the Team section & booking dropdown.
- `PATCH /doctors/me` *(doctor/super-admin)* — update specialty, photo, working
  hours, education, experience.

### Appointments
- `POST /appointments` — **public**; works for guests or logged-in patients.
  Validates required fields, blocks past dates, blocks exact duplicates, and
  assigns a daily **serial** per doctor. New bookings start **unpaid**. Logged-in
  bookings are linked to the account.
- `GET /appointments/mine` *(patient)* — that patient's booking history.
- `GET /appointments/doctor` *(doctor/super-admin)* — that doctor's bookings,
  optionally filtered by date.
- `PATCH /appointments/:id/done` *(doctor/super-admin)* — mark an appointment done.
- `GET /appointments/doctor/stats` *(doctor/super-admin)* — total patients,
  today's count, total revenue (**paid appointments only**), and last-7-days
  counts/revenue. Super-admin sees clinic-wide totals; a doctor sees only their own.
- `GET /appointments/all` *(cashier)* — every booking across all doctors.
- `PATCH /appointments/:id/paid` *(cashier)* — toggle an appointment's **paid**
  flag; this is what feeds doctor revenue.

> On Vercel these are reached at `/api/...` (e.g. `/api/jwt`); the server strips
> the `/api` prefix internally so the routes above stay as written.

---

## Run locally

Two terminals — the API and the Vite dev server run separately in development.

```bash
# 1. Backend → http://localhost:5000
cd server && npm install && npm start      # or: npm run dev  (auto-reload)

# 2. Frontend → http://localhost:5173
cd client && npm install && npm run dev
```

Set `VITE_API_URL=http://localhost:5000` in `client/.env` for local dev. Firebase
web config lives in `client/src/firebase.js` (from `VITE_FIREBASE_*` env vars).

---

## Environment variables

### Server (`server/.env` — never commit it)
| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | signs the session cookie |
| `FIREBASE_PROJECT_ID` | verifies Firebase ID tokens |
| `SUPER_ADMIN_EMAIL` | email that becomes the super admin |
| `FRONTEND_URL` | allowed CORS origin(s), comma-separated (dev only) |
| `PORT` | optional, defaults to 5000 |
| `NODE_ENV` | `production` enables the secure cookie (set automatically on Vercel) |

### Client (`client/.env`)
| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | API base — `http://localhost:5000` in dev, `/api` in production |
| `VITE_FIREBASE_*` | Firebase web config (apiKey, authDomain, projectId, …) |

---

## Deploy (one Vercel project, from GitHub)

1. Push this whole repo to GitHub.
2. In Vercel, **Import** the GitHub repo. Leave the root directory at the repo
   root — `vercel.json` handles building both `client` and `server`.
3. Add the env vars above in **Project → Settings → Environment Variables**
   (Production scope). Set `VITE_API_URL` to `/api`. Don't set `NODE_ENV` — Vercel
   sets it to `production` automatically.
4. In **Firebase → Authentication → Settings → Authorized domains**, add your
   `*.vercel.app` domain so Google sign-in works.
5. Deploy. Vercel auto-deploys on every push to the default branch.
