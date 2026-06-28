import { Navigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext.jsx'

// Gates a route by login + (optionally) role. `roles` omitted = any logged-in user.
export default function ProtectedRoute({ children, roles }) {
  const { user, role, loading } = useAuth()

  if (loading) {
    return <div className="py-32 text-center text-ink/60">Loading…</div>
  }
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />
  return children
}
