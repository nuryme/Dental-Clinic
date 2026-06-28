import { useEffect, useState } from 'react'
import { api } from '../../api.js'
import { useAuth } from '../../AuthContext.jsx'
import DashboardLayout from '../../layouts/DashboardLayout.jsx'

const field =
  'w-full rounded-lg border border-sky-muted/60 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand'

export default function PatientDashboard() {
  const { user, refresh } = useAuth()
  const [tab, setTab] = useState('Appointments')
  const [appointments, setAppointments] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api('/appointments/mine')
      .then(setAppointments)
      .catch(() => setAppointments([]))
  }, [])

  async function saveProfile(e) {
    e.preventDefault()
    setSaved(false)
    await api('/users/me', { method: 'PATCH', body: { name: e.target.name.value, phone: e.target.phone.value } })
    await refresh()
    setSaved(true)
  }

  const nav = [
    { label: 'My Appointments', active: tab === 'Appointments', onClick: () => setTab('Appointments') },
    { label: 'Profile', active: tab === 'Profile', onClick: () => setTab('Profile') },
  ]

  return (
    <DashboardLayout eyebrow={`Hello, ${user?.name || 'patient'}`} title="My Dashboard" nav={nav}>
      {tab === 'Appointments' && (
        appointments.length === 0 ? (
          <p className="rounded-2xl bg-white p-7 text-sm text-ink/60 shadow-lg shadow-brand/5">
            You have no booked appointments yet.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-brand/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand/5 text-xs uppercase tracking-wider text-brand">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Doctor</th>
                  <th className="px-5 py-3">Service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-muted/30">
                {appointments.map((a) => (
                  <tr key={a._id}>
                    <td className="px-5 py-3 text-ink/80">{a.date}</td>
                    <td className="px-5 py-3 text-ink/80">{a.doctorName}</td>
                    <td className="px-5 py-3 text-ink/80">{a.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
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
