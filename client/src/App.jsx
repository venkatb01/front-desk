import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RoomSelectionPage from './components/common/RoomSelection'
import BookingConfirmationPage from './components/user/BookingConfirmation'
import PaymentPage from './components/user/Payment'
import ReservationsPage from './components/user/ReservationPage'
import GuestsPage from './components/admin/GuestsPage'
import GuestRegisterPage from './components/user/auth/GuestRegister'
import AdminLayout from './layouts/AdminLayout'
import LoginPage from './components/admin/auth/login'
import RegisterPage from './components/admin/auth/Register'
import UserLayout from './layouts/UserLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './context/AppContext'

function App() {
  return (
<>
  <AppProvider>
  <BrowserRouter>
    <ToastContainer />
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
  </AppProvider>
</>
  )
}

export default App
