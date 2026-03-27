// import React from 'react'

import { Link } from "react-router-dom"
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { 
  Home,
  FolderKanban,   
  Users,          
  Settings,
} from "lucide-react";
const Sidbar = ({ isOpen }:any) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <TooltipProvider>
    
    <aside className={`h-full bg-gray-700 text-white flex flex-col transition-all duration-300  `}>

      <div className={` border-b border-slate-700 flex items-center ${isOpen ?'justify-start p-4':'justify-center w-10   px-1 py-2 transition-all duration-300 '} `}>
       {isOpen ? <img src="/atribs-logo.svg" /> :<div className=""><img src="/pwa-192x192.png"/> </div>}  {/*<span className="text-white font-extrabold bg-red-600 px-1 rounded-2xl">AT</span> */}
      </div>

      <nav className={`flex flex-col gap-4  ${isOpen?'p-4':'p-2 '}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/admin" onClick={()=>setActiveTab("Dashboard")} className={`flex items-center gap-3 hover:bg-gray-600 p-2 rounded ${!isOpen && "justify-center"} ${ activeTab === "Dashboard"
                    ? "bg-indigo-600 text-white "
                    : ""}`}>
               <div className=""><Home size={20} /></div>
              {isOpen && <span>Dashboard</span>}
              </Link>     
          </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">
                  Dashboard
                  </TooltipContent>
                  )}
        </Tooltip>
          {/* <Link to={'/admin'} className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded">
          <i className="bi bi-house-lock-fill"></i>
          <span>Dashboard</span></Link> */}
          <Tooltip>
            <TooltipTrigger asChild>
                <Link to={'/admin/employees'} onClick={()=>setActiveTab("Employees")} className={`flex items-center gap-3 hover:bg-gray-600 p-2 rounded  ${!isOpen && "justify-center"}
                ${ activeTab === "Employees"
                    ? "bg-indigo-600 text-white  shadow-indigo-100"
                    : ""}`}>
                <div><Users size={20}  /></div>
{isOpen && <span>Employees</span>}</Link>
          </TooltipTrigger>
          {!isOpen && (
            <TooltipContent side="right">
            Employees
            </TooltipContent>
            )}
        </Tooltip>
         <Tooltip>
            <TooltipTrigger asChild>
                <Link to={'/admin/project'} onClick={()=>setActiveTab("Projects")} className={`flex items-center gap-2 hover:bg-gray-600 p-2 rounded ${!isOpen && "justify-center"}
                 ${ activeTab === "Projects"
                    ? "bg-indigo-600 text-white  shadow-indigo-100"
                    : ""}`}>
                 <div><FolderKanban size={20} /></div>
            {isOpen && <span>Projects</span>}</Link>
          </TooltipTrigger>
          {!isOpen && (
            <TooltipContent side="right">
           Project
            </TooltipContent>
            )}
        </Tooltip>
      </nav>
      <Tooltip>
        <TooltipTrigger asChild>
      <div className={`mt-auto gap-4 ${isOpen ? 'p-3':'p-2'} `}>
        <Link to={'/admin/setting'} onClick={()=>setActiveTab("Settings")} className={`flex items-center gap-2 hover:bg-gray-600 p-2 rounded ${!isOpen && "justify-center"}
        ${ activeTab === "Settings"
                    ? "bg-indigo-600 text-white shadow-indigo-100"
                    : ""}`}>
            <div><Settings size={20} /></div>
            {isOpen && <span>Settings</span>}
            {!isOpen && (
            <TooltipContent side="right">
           Settings
            </TooltipContent>
            )}
          </Link>
        </div>
        </TooltipTrigger>
      </Tooltip>
    </aside>
    </TooltipProvider>
  )
}

export default Sidbar

