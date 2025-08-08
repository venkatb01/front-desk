
import { Outlet } from 'react-router-dom'
import Header from '../components/admin/Header'
import Footer from '../components/common/Footer'

export default function UserLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}
