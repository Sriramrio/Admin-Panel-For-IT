import Sidbar from "../Home/Sidbar"
import Navbar from "../Home/Navbar"
import { useState } from "react"
import { Outlet } from "react-router-dom"
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const togglesidebar=()=>{
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen  bg-slate-50 overflow-auto">
      <div className={`${isSidebarOpen?"w-64":'w-10'}  transition-all duration-700 ease-in-out overflow-auto bg-white border-r`}>
      <Sidbar isOpen={isSidebarOpen} /></div>

  <div className="flex-1 flex flex-col">
    <Navbar onMenuClick={togglesidebar} />

    <main className="flex-1 overflow-auto p-6 bg-gray-100">
      <Outlet/>
    </main>
  </div>
</div>
  )
}

export default AdminLayout
