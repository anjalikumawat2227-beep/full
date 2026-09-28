
import { Outlet } from 'react-router'
import AsideNav from '../../feature/dashBoard/ui/components/AsideNav.jsx'
import TopNav from '../../feature/dashBoard/ui/components/TopNav.jsx'

const MainLayout = () => {
  return (
  <>
 <TopNav/>
  <div className="flex w-full h-screen overflow-hidden">
  <AsideNav/>
    <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
  <Outlet/>
    </main>
  </div>
  </>
  )
  
}

export default MainLayout
