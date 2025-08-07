
import { Outlet } from 'react-router-dom'
import Header from '../components/admin/header'
import Footer from '../components/common/footer'

export default function UserLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* All nested user pages will render here */}
      </main>
      <Footer />
    </div>
  )
}
