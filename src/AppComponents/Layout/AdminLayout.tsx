import Sidbar from "../Home/Sidbar";
import Navbar from "../Home/Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const togglesidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    //     <div className="flex h-screen  bg-slate-50 overflow-auto">
    //       <div className={`${isSidebarOpen?"w-64":'w-10'}  transition-all duration-700 ease-in-out overflow-auto bg-white border-r`}>
    //       <Sidbar isOpen={isSidebarOpen} /></div>

    //   <div className="flex-1 flex flex-col">
    //     <Navbar onMenuClick={togglesidebar} />

    //     <main className="flex-1 overflow-auto p-6 bg-gray-100">
    //       <Outlet/>
    //     </main>
    //   </div>
    // </div>
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-0" : "w-10"} md:${isSidebarOpen ? "w-64" : "w-10"}  lg:${isSidebarOpen ? "w-64" : "w-10 "}  text-8xltransition-all duration-700 ease-in-out overflow-auto bg-white border-r`}
      >
        <Sidbar isOpen={isSidebarOpen} />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Navbar */}
        <Navbar onMenuClick={togglesidebar} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-2 lg:p-3 sm:p-4 md:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
