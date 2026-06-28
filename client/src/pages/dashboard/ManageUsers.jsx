import { useEffect, useState } from 'react'
import { api } from '../../api.js'

// Content-only panel — rendered as the "Manage Users" tab inside the dashboard
// so the sidebar stays put (no second sidebar / route hop).
export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [busyId, setBusyId] = useState(null)
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const shown = q ? users.filter((u) => (u.name || '').toLowerCase().includes(q)) : users

  const load = () =>
    api('/users')
      .then(setUsers)
      .catch(() => setUsers([]))
  useEffect(() => {
    load()
  }, [])

  async function setRole(id, role) {
    setBusyId(id)
    try {
      await api(`/users/${id}/role`, { method: 'PATCH', body: { role } })
      await load()
    } finally {
      setBusyId(null)
    }
  }

  const badge = {
    'super-admin': 'bg-ink text-white',
    doctor: 'bg-brand text-white',
    patient: 'bg-brand/10 text-brand',
  }

  return (
      <div className="max-w-5xl">
          <p className="mb-6 text-sm text-ink/60">Promote a patient to doctor, or revert a doctor to patient.</p>
          <div className="mb-6 flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="w-full max-w-sm rounded-lg border border-sky-muted/60 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded-lg border border-sky-muted/60 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand/5"
              >
                Clear
              </button>
            )}
          </div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-brand/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand/5 text-xs uppercase tracking-wider text-brand">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-muted/30">
                {shown.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-6 text-center text-ink/50">
                      No users match “{query}”.
                    </td>
                  </tr>
                )}
                {shown.map((u) => (
                  <tr key={u._id}>
                    <td className="px-5 py-3 text-ink/80">{u.name || '—'}</td>
                    <td className="px-5 py-3 text-ink/80">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[u.role] || ''}`}>{u.role}</span>
                    </td>
                    <td className="px-5 py-3">
                      {u.role === 'patient' && (
                        <button
                          type="button"
                          disabled={busyId === u._id}
                          onClick={() => setRole(u._id, 'doctor')}
                          className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                        >
                          Make doctor
                        </button>
                      )}
                      {u.role === 'doctor' && (
                        <button
                          type="button"
                          disabled={busyId === u._id}
                          onClick={() => setRole(u._id, 'patient')}
                          className="rounded-full border border-sky-muted/60 px-4 py-1.5 text-xs font-semibold text-ink transition hover:bg-brand/5 disabled:opacity-60"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
  )
}
