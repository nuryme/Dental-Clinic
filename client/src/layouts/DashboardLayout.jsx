import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { useAuth } from '../AuthContext.jsx'

// Left-sidebar shell for all dashboards. Logo (→ home) on top, nav below, logout
// at the bottom. nav items are either { label, to } (route link) or
// { label, onClick, active } (in-page tab). ponytail: one layout, three dashboards.
export default function DashboardLayout({ title, eyebrow, nav, children }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-brand/5">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sky-muted/30 bg-white lg:flex">
        <Link to="/" aria-label="Smile Dental — home" className="flex items-center border-b border-sky-muted/30 px-6 py-5">
          <img src={logo} alt="Smile Dental" className="h-14 w-auto" />
        </Link>
        <nav className="flex-1 space-y-1 px-4 py-6">
          <NavItems nav={nav} />
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="m-4 rounded-lg border border-sky-muted/60 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand/5"
        >
          Logout
        </button>
      </aside>

      <div className="min-w-0 flex-1">
        {/* mobile top bar */}
        <header className="flex items-center justify-between border-b border-sky-muted/30 bg-white px-6 py-3 lg:hidden">
          <Link to="/" aria-label="Smile Dental — home">
            <img src={logo} alt="Smile Dental" className="h-12 w-auto" />
          </Link>
          <button type="button" onClick={handleLogout} className="text-sm font-semibold text-ink hover:text-brand">
            Logout
          </button>
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-sky-muted/30 bg-white px-4 py-3 lg:hidden">
          <NavItems nav={nav} inline />
        </nav>

        <main className="p-6 lg:p-10">
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>}
          <h1 className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">{title}</h1>
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

function NavItems({ nav, inline }) {
  const base = inline
    ? 'whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition'
    : 'block rounded-lg px-4 py-2.5 text-sm font-semibold transition'
  return nav.map((item) =>
    item.to ? (
      <Link key={item.label} to={item.to} className={`${base} text-ink hover:bg-brand/5`}>
        {item.label}
      </Link>
    ) : (
      <button
        key={item.label}
        type="button"
        onClick={item.onClick}
        className={`${base} text-left ${item.active ? 'bg-brand text-white' : 'text-ink hover:bg-brand/5'}`}
      >
        {item.label}
      </button>
    )
  )
}
