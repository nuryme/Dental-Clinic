import { useEffect, useState } from 'react'
import { api } from '../../api.js'

// Content-only panel — rendered as the "Manage Users" tab inside the dashboard
// so the sidebar stays put (no second sidebar / route hop).
export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [busyId, setBusyId] = useState(null)
  const [confirmId, setConfirmId] = useState(null) // user pending delete confirmation
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all') // all | doctor | cashier | patient

  const q = query.trim().toLowerCase()
  const shown = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false
    if (q && !(u.name || '').toLowerCase().includes(q)) return false
    return true
  })

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

  async function remove(id) {
    setBusyId(id)
    try {
      await api(`/users/${id}`, { method: 'DELETE' })
      setConfirmId(null)
      await load()
    } finally {
      setBusyId(null)
    }
  }

  const badge = {
    'super-admin': 'bg-ink text-white',
    doctor: 'bg-brand text-white',
    cashier: 'bg-green-600 text-white',
    patient: 'bg-brand/10 text-brand',
  }

  const roleBtn = (key) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      roleFilter === key ? 'bg-brand text-white' : 'border border-sky-muted/60 text-ink hover:bg-brand/5'
    }`

  return (
      <div>
          <p className="mb-6 text-sm text-ink/60">Promote a patient to doctor or cashier, or revert them to patient.</p>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="w-full max-w-sm rounded-lg border border-sky-muted/60 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setRoleFilter('all')} className={roleBtn('all')}>
                All
              </button>
              <button type="button" onClick={() => setRoleFilter('doctor')} className={roleBtn('doctor')}>
                Doctor
              </button>
              <button type="button" onClick={() => setRoleFilter('cashier')} className={roleBtn('cashier')}>
                Cashier
              </button>
              <button type="button" onClick={() => setRoleFilter('patient')} className={roleBtn('patient')}>
                Patient
              </button>
            </div>
            {(query || roleFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setRoleFilter('all')
                }}
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
                  <th className="px-5 py-3">Make doctor</th>
                  <th className="px-5 py-3">Make cashier</th>
                  <th className="px-5 py-3">Revoke</th>
                  <th className="px-5 py-3">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-muted/30">
                {shown.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-6 text-center text-ink/50">
                      No users match these filters.
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
                    {/* each action in its own column; empty cell when it doesn't apply */}
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
                    </td>
                    <td className="px-5 py-3">
                      {u.role === 'patient' && (
                        <button
                          type="button"
                          disabled={busyId === u._id}
                          onClick={() => setRole(u._id, 'cashier')}
                          className="rounded-full bg-green-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                        >
                          Make cashier
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {(u.role === 'doctor' || u.role === 'cashier') && (
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
                    {/* delete — never for a super-admin; two-step confirm (no window.confirm) */}
                    <td className="px-5 py-3">
                      {u.role !== 'super-admin' &&
                        (confirmId === u._id ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={busyId === u._id}
                              onClick={() => remove(u._id)}
                              className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmId(null)}
                              className="rounded-full border border-sky-muted/60 px-4 py-1.5 text-xs font-semibold text-ink transition hover:bg-brand/5"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            disabled={busyId === u._id}
                            onClick={() => setConfirmId(u._id)}
                            className="rounded-full border border-red-300 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                          >
                            Delete
                          </button>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
  )
}
