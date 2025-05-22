import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Landing = lazy(() => import('./pages/Landing'))
const Room = lazy(() => import('./pages/Room'))
const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const RoomType = lazy(() => import('./pages/RoomType'))
const Bookings = lazy(() => import('./pages/Bookings'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const Reservations = lazy(() => import('./pages/Reservations'))
const IoTDevice = lazy(() => import('./pages/IotDevice'))
const CardManagement = lazy(() => import('./pages/CardManagement'))
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes wrapped by ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/room-type"  element={<RoomType />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/iot-devices" element={<IoTDevice />} />
            <Route path="/iot-cards" element={<CardManagement />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
