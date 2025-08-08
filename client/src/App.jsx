import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RoomSelectionPage from './components/common/roomSelection'
import BookingConfirmationPage from './components/user/bookingConfirmation'
import PaymentPage from './components/user/payment'
import ReservationsPage from './components/user/reservationPage'
import GuestsPage from './components/admin/guestsPage'
import GuestRegisterPage from './components/user/auth/guestRegister'
import AdminLayout from './layouts/adminLayout'
import LoginPage from './components/user/auth/Login'
import RegisterPage from './components/admin/auth/register'
import UserLayout from './layouts/userLayout'

function App() {
  return (
<>
  <BrowserRouter>
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
        <Route path="/guest-register" element={<GuestRegisterPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />

      
      <Route path="/" element={<UserLayout />}>
          <Route index element={<Navigate to="rooms" />} />
          <Route path="rooms" element={<RoomSelectionPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="confirmation" element={<BookingConfirmationPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="reservations" />} />
        <Route path="guests" element={<GuestsPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
      </Route>

    </Routes>
  </BrowserRouter>

</>
  )
}

export default App
