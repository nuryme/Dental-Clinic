import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'

const field =
  'w-full rounded-lg border border-sky-muted/60 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand'

export default function Login() {
  const { user, role, login, loginGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Redirect by role once the auth state populates.
  useEffect(() => {
    if (user) navigate(role === 'doctor' || role === 'super-admin' ? '/admin' : '/dashboard', { replace: true })
  }, [user, role, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(e.target.email.value, e.target.password.value)
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setError('')
    try {
      await loginGoogle()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Welcome back" title="Log In" />
      <section className="bg-brand/5 py-20 lg:py-28">
        <div className="mx-auto max-w-md px-6">
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-lg shadow-brand/5">
            <label className="block text-sm font-semibold text-ink">Email</label>
            <input name="email" type="email" required className={`${field} mt-1.5`} />
            <label className="mt-4 block text-sm font-semibold text-ink">Password</label>
            <input name="password" type="password" required className={`${field} mt-1.5`} />

            {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {busy ? 'Logging in…' : 'Log In'}
            </button>

            <button
              type="button"
              onClick={handleGoogle}
              className="mt-3 w-full rounded-lg border border-sky-muted/60 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-brand/5"
            >
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-ink/60">
              No account?{' '}
              <Link to="/register" className="font-semibold text-brand">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
