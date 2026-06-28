import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { api } from '../../api.js'
import { useAuth } from '../../AuthContext.jsx'
import DashboardLayout from '../../layouts/DashboardLayout.jsx'
import ManageUsers from './ManageUsers.jsx'

const field =
  'w-full rounded-lg border border-sky-muted/60 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand'
const today = () => new Date().toISOString().slice(0, 10)

export default function DoctorDashboard() {
  const { user, role, refresh } = useAuth()
  const [tab, setTab] = useState('Overview')
  const [stats, setStats] = useState(null)
  const [date, setDate] = useState(today())
  const [appts, setAppts] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api('/appointments/doctor/stats')
      .then(setStats)
      .catch(() => setStats(null))
  }, [])

  useEffect(() => {
    if (tab !== 'Manage Patients') return
    api(`/appointments/doctor?date=${date}`)
      .then(setAppts)
      .catch(() => setAppts([]))
  }, [tab, date])

  async function saveProfile(e) {
    e.preventDefault()
    setSaved(false)
    const f = e.target
    await api('/doctors/me', {
      method: 'PATCH',
      body: {
        name: f.name.value,
        specialty: f.specialty.value,
        workingHours: f.workingHours.value,
        photoURL: f.photoURL.value,
        education: f.education.value,
        experience: f.experience.value,
      },
    })
    await refresh()
    setSaved(true)
  }

  const taka = (n) => `৳${(n || 0).toLocaleString()}`

  async function markDone(id) {
    await api(`/appointments/${id}/done`, { method: 'PATCH' })
    setAppts((prev) => prev.map((a) => (a._id === id ? { ...a, done: true } : a)))
  }

  // Super-admin: clinic-wide overview + user management. Doctor: their own
  // overview + their own appointment ("Manage Patients") list.
  const isSuper = role === 'super-admin'
  const tabs = isSuper ? ['Overview', 'Profile', 'Manage Users'] : ['Overview', 'Manage Patients', 'Profile']
  const nav = tabs.map((t) => ({ label: t, active: tab === t, onClick: () => setTab(t) }))

  return (
    <DashboardLayout
      eyebrow={isSuper ? 'Super-admin' : `Dr. ${user?.name || ''}`}
      title={isSuper ? 'Super Admin Dashboard' : 'Doctor Dashboard'}
      nav={nav}
    >
      <div>
          {/* OVERVIEW */}
          {tab === 'Overview' && (
            <div>
              <div className="grid gap-5 sm:grid-cols-3">
                <Stat label="Today's appointments" value={stats?.todayCount ?? 0} />
                <Stat label="Total appointments" value={stats?.totalPatients ?? 0} />
                <Stat label="Total revenue" value={taka(stats?.totalRevenue)} />
              </div>

              <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg shadow-brand/5">
                <h3 className="font-display text-lg font-bold text-ink">Last 7 days</h3>
                <div className="mt-5 h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={stats?.last7Days || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5ecf6" />
                      <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} fontSize={12} stroke="#2c3244" />
                      <YAxis yAxisId="left" allowDecimals={false} fontSize={12} stroke="#1262fa" />
                      <YAxis yAxisId="right" orientation="right" fontSize={12} stroke="#82b4ed" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="count" name="Appointments" fill="#1262fa" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue (৳)" stroke="#82b4ed" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* MANAGE PATIENTS (doctor's appointment list) */}
          {tab === 'Manage Patients' && (
            <div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-ink">Show date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${field} w-auto`} />
              </div>
              {appts.length === 0 ? (
                <p className="mt-6 rounded-2xl bg-white p-7 text-sm text-ink/60 shadow-lg shadow-brand/5">
                  No appointments on {date}.
                </p>
              ) : (
                <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-lg shadow-brand/5">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-brand/5 text-xs uppercase tracking-wider text-brand">
                      <tr>
                        <th className="px-5 py-3">Patient</th>
                        <th className="px-5 py-3">Phone</th>
                        <th className="px-5 py-3">Service</th>
                        <th className="px-5 py-3">Price</th>
                        <th className="px-5 py-3">Payment</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-muted/30">
                      {appts.map((a) => (
                        <tr key={a._id}>
                          <td className="px-5 py-3 text-ink/80">{a.patientName}</td>
                          <td className="px-5 py-3 text-ink/80">{a.phone}</td>
                          <td className="px-5 py-3 text-ink/80">{a.service}</td>
                          <td className="px-5 py-3 font-semibold text-brand">{taka(a.price)}</td>
                          <td className="px-5 py-3">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                a.paid ? 'bg-green-600 text-white' : 'bg-sky-muted/30 text-ink/70'
                              }`}
                            >
                              {a.paid ? 'Paid' : 'Unpaid'}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <button
                              type="button"
                              disabled={a.done}
                              onClick={() => markDone(a._id)}
                              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                                a.done
                                  ? 'cursor-default bg-green-600 text-white'
                                  : 'bg-brand/10 text-brand hover:bg-brand/20'
                              }`}
                            >
                              {a.done ? 'Done' : 'Mark done'}
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

          {/* PROFILE */}
          {tab === 'Profile' && (
            <form onSubmit={saveProfile} className="max-w-lg rounded-2xl bg-white p-7 shadow-lg shadow-brand/5">
              <h3 className="font-display text-lg font-bold text-ink">My Profile</h3>
              <p className="mt-1 text-sm text-ink/60">This is what patients see on the site and at booking.</p>
              <label className="mt-5 block text-sm font-semibold text-ink">Name</label>
              <input name="name" defaultValue={user?.name || ''} className={`${field} mt-1.5`} />
              <label className="mt-4 block text-sm font-semibold text-ink">Specialty</label>
              <input name="specialty" defaultValue={user?.specialty || ''} placeholder="e.g. Orthodontist" className={`${field} mt-1.5`} />
              <label className="mt-4 block text-sm font-semibold text-ink">Working hours (shown to patients)</label>
              <input name="workingHours" defaultValue={user?.workingHours || ''} placeholder="e.g. Sat–Thu, 5 PM – 9 PM" className={`${field} mt-1.5`} />
              <label className="mt-4 block text-sm font-semibold text-ink">Photo URL</label>
              <input name="photoURL" defaultValue={user?.photoURL || ''} placeholder="https://…" className={`${field} mt-1.5`} />
              <label className="mt-4 block text-sm font-semibold text-ink">Education background</label>
              <textarea name="education" rows={4} defaultValue={user?.education || ''} placeholder="One qualification per line, e.g.&#10;BDS — Dhaka University&#10;PGT — Oral & Maxillofacial Surgery" className={`${field} mt-1.5`} />
              <label className="mt-4 block text-sm font-semibold text-ink">Experience</label>
              <textarea name="experience" rows={4} defaultValue={user?.experience || ''} placeholder="One role per line, e.g.&#10;Consultant, Smile Dental (2019–present)&#10;7+ years in implant dentistry" className={`${field} mt-1.5`} />
              <button type="submit" className="mt-6 rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                Save profile
              </button>
              {saved && <p className="mt-3 text-sm text-green-600">Profile updated.</p>}
            </form>
          )}

          {/* MANAGE USERS (super-admin only) */}
          {tab === 'Manage Users' && <ManageUsers />}
      </div>
    </DashboardLayout>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg shadow-brand/5">
      <p className="font-display text-3xl font-extrabold text-brand">{value}</p>
      <p className="mt-1 text-sm text-ink/60">{label}</p>
    </div>
  )
}
