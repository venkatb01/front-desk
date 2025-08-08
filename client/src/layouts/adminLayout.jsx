import { Outlet } from 'react-router-dom'
import Header from '../components/admin/Header'
import Footer from '../components/common/Footer'


export default function AdminLayout() {
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
