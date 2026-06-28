import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'

// Public site shell: Navbar + page + Footer, with scroll-to-top on navigation.
export default function MainLayout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
