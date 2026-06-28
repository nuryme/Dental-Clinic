import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import { useAuth } from '../../AuthContext.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
]

function Logo() {
  return (
    <Link to="/" aria-label="Smile Dental — home" className="flex items-center">
      <img src={logo} alt="Smile Dental" className="h-16 w-auto md:h-20" />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()

  const dashTo = role === 'doctor' || role === 'super-admin' ? '/admin' : '/dashboard'

  const handleLogout = async () => {
    await logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 lg:px-10">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`rounded-md px-5 py-2.5 text-base font-medium transition ${
                  pathname === to ? 'bg-brand text-white' : 'text-ink hover:text-brand'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Link
                to={dashTo}
                className="rounded-full px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/5"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:text-brand">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-ink md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
            <path strokeLinecap="round" d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="border-t border-sky-muted/40 px-6 py-2 md:hidden">
          {links.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === to ? 'text-brand' : 'text-ink hover:text-brand'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-2 border-t border-sky-muted/40 pt-2">
            {user ? (
              <>
                <Link to={dashTo} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand">
                  Dashboard
                </Link>
                <button type="button" onClick={handleLogout} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink hover:text-brand">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:text-brand">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand">
                  Register
                </Link>
              </>
            )}
          </li>
        </ul>
      )}
    </header>
  )
}
