import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/auth/login'
import Header from './components/header'
import RoomSelectionPage from './components/roomSelection'
import Footer from './components/footer'
import RegisterPage from './components/auth/register'

function App() {
  return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter> */}
      <LoginPage/>
      <RegisterPage/>
      {/* <Header/>
      <RoomSelectionPage/>
      <Footer/> */}
    </div>
  )
}

export default App
