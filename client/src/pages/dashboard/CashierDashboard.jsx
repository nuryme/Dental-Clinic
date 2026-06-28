import { useEffect, useMemo, useState } from 'react'
import { api } from '../../api.js'
import { useAuth } from '../../AuthContext.jsx'
import DashboardLayout from '../../layouts/DashboardLayout.jsx'

const field =
  'w-full rounded-lg border border-sky-muted/60 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand'
const taka = (n) => `৳${(n || 0).toLocaleString()}`

// Cashier desk: every booking across all doctors. Toggle Paid once the patient
// pays in person — that flag is what counts toward each doctor's revenue.
export default function CashierDashboard() {
  const { user, refresh } = useAuth()
  const [tab, setTab] = useState('Patients')
  const [appts, setAppts] = useState([])
  const [busyId, setBusyId] = useState(null)
  const [saved, setSaved] = useState(false)

  // filters
  const [date, setDate] = useState('') // '' = all days
  const [query, setQuery] = useState('') // name or email
  const [status, setStatus] = useState('all') // all | paid | unpaid

  const load = () =>
    api('/appointments/all')
      .then(setAppts)
      .catch(() => setAppts([]))
  useEffect(() => {
    load()
  }, [])

  async function togglePaid(a) {
    setBusyId(a._id)
    try {
      await api(`/appointments/${a._id}/paid`, { method: 'PATCH', body: { paid: !a.paid } })
      setAppts((prev) => prev.map((x) => (x._id === a._id ? { ...x, paid: !a.paid } : x)))
    } finally {
      setBusyId(null)
    }
  }

  async function saveProfile(e) {
    e.preventDefault()
    setSaved(false)
    await api('/users/me', { method: 'PATCH', body: { name: e.target.name.value, phone: e.target.phone.value } })
    await refresh()
    setSaved(true)
  }

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return appts.filter((a) => {
      if (date && a.date !== date) return false
      if (status === 'paid' && !a.paid) return false
      if (status === 'unpaid' && a.paid) return false
      if (q && !`${a.patientName} ${a.email || ''}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [appts, date, query, status])

  const nav = [
    { label: 'Patients', active: tab === 'Patients', onClick: () => setTab('Patients') },
    { label: 'Profile', active: tab === 'Profile', onClick: () => setTab('Profile') },
  ]

  const statusBtn = (key, label) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      status === key ? 'bg-brand text-white' : 'border border-sky-muted/60 text-ink hover:bg-brand/5'
    }`

  return (
    <DashboardLayout eyebrow={`Cashier — ${user?.name || ''}`} title="Cashier Dashboard" nav={nav}>
      {tab === 'Patients' && (
        <div>
          {/* filters — all on one line */}
          <div className="flex items-center gap-3 overflow-x-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email"
              className="w-64 shrink-0 rounded-lg border border-sky-muted/60 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-64 shrink-0 rounded-lg border border-sky-muted/60 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand"
            />
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => setStatus('all')} className={statusBtn('all')}>
                All
              </button>
              <button type="button" onClick={() => setStatus('paid')} className={statusBtn('paid')}>
                Paid
              </button>
              <button type="button" onClick={() => setStatus('unpaid')} className={statusBtn('unpaid')}>
                Unpaid
              </button>
            </div>
            {(date || query || status !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setDate('')
                  setQuery('')
                  setStatus('all')
                }}
                className="shrink-0 rounded-full border border-sky-muted/60 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-brand/5"
              >
                Clear
              </button>
            )}
          </div>

          {shown.length === 0 ? (
            <p className="mt-6 rounded-2xl bg-white p-7 text-sm text-ink/60 shadow-lg shadow-brand/5">
              No appointments match these filters.
            </p>
          ) : (
            <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-lg shadow-brand/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand/5 text-xs uppercase tracking-wider text-brand">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Patient</th>
                    <th className="px-5 py-3">Phone</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Doctor</th>
                    <th className="px-5 py-3">Service</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-muted/30">
                  {shown.map((a) => (
                    <tr key={a._id}>
                      <td className="px-5 py-3 text-ink/80">{a.date}</td>
                      <td className="px-5 py-3 text-ink/80">{a.patientName}</td>
                      <td className="px-5 py-3 text-ink/80">{a.phone}</td>
                      <td className="px-5 py-3 text-ink/80">{a.email || '—'}</td>
                      <td className="px-5 py-3 text-ink/80">{a.doctorName}</td>
                      <td className="px-5 py-3 text-ink/80">{a.service}</td>
                      <td className="px-5 py-3 font-semibold text-brand">{taka(a.price)}</td>
                      <td className="px-5 py-3">
                        <button
                          type="button"
                          disabled={busyId === a._id}
                          onClick={() => togglePaid(a)}
                          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
                            a.paid
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-brand/10 text-brand hover:bg-brand/20'
                          }`}
                        >
                          {a.paid ? 'Paid ✓' : 'Mark paid'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'Profile' && (
        <form onSubmit={saveProfile} className="max-w-lg rounded-2xl bg-white p-7 shadow-lg shadow-brand/5">
          <h2 className="font-display text-xl font-bold text-ink">My Profile</h2>
          <label className="mt-5 block text-sm font-semibold text-ink">Name</label>
          <input name="name" defaultValue={user?.name || ''} className={`${field} mt-1.5`} />
          <label className="mt-4 block text-sm font-semibold text-ink">Phone</label>
          <input name="phone" defaultValue={user?.phone || ''} className={`${field} mt-1.5`} />
          <p className="mt-4 text-xs text-ink/50">Email: {user?.email}</p>
          <button type="submit" className="mt-5 rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            Save
          </button>
          {saved && <p className="mt-3 text-sm text-green-600">Profile updated.</p>}
        </form>
      )}
    </DashboardLayout>
  )
}
