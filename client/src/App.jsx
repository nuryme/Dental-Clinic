import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import Home from './pages/main/Home.jsx'
import Services from './pages/main/Services.jsx'
import About from './pages/main/About.jsx'
import Reviews from './pages/main/Reviews.jsx'
import Contact from './pages/main/Contact.jsx'
import Login from './pages/main/Login.jsx'
import Register from './pages/main/Register.jsx'
import DoctorDetail from './pages/main/DoctorDetail.jsx'
import PatientDashboard from './pages/dashboard/PatientDashboard.jsx'
import DoctorDashboard from './pages/dashboard/DoctorDashboard.jsx'
import CashierDashboard from './pages/dashboard/CashierDashboard.jsx'

export default function App() {
  return (
    <Routes>
      {/* public site — Navbar + Footer shell */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
      </Route>

      {/* dashboards — own sidebar chrome (DashboardLayout), no public Navbar/Footer */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['doctor', 'super-admin']}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cashier"
        element={
          <ProtectedRoute roles={['cashier']}>
            <CashierDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
