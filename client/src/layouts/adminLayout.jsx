import { Outlet } from 'react-router-dom'
import Header from '../components/admin/header'
import Footer from '../components/common/footer'


export default function AdminLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Renders the nested admin routes here */}
      </main>
      <Footer />
    </div>
  )
}
