

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Search, Menu, Mail, LogOut, UserCircle } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const session = useLiveQuery(() => db.session.toArray());
  const navigate = useNavigate(); // Renamed from 'navigator' (standard practice)
  
  // Safely get the first user
  const user1 = session?.[0];

  async function handleLogout() {
    await db.session.clear();
    navigate('/login');
  }

  return (
    <header className="flex h-16 bg-white border-b items-center justify-between px-3 sm:px-4 md:px-6 sticky top-0 z-30">
      
    
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 ">
        <button 
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 active:scale-90 " 
          onClick={onMenuClick}
        >
          <Menu size={24} className="sm:size-"/>
        </button>

        {/* Modern Search Bar */}
        <div className="relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="bg-slate-50 border-transparent border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2 w-64 lg:w-80 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Right Side: Actions & User Profile */}
      <div className="flex items-center gap-3">
        
        {/* Notifications/Mail */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
          <Mail size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

        {/* User Badge */}
        <div className="flex items-center gap-3 bg-slate-900 text-white px-3 py-1.5 rounded-full border border-slate-800 shadow-sm hover:bg-slate-800 transition-all cursor-default">
          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
             <UserCircle size={18} />
          </div>
          <span className="text-xs font-bold tracking-wide uppercase truncate max-w-[100px]">
            {user1?.username || "Guest"}
          </span>
        </div>

        {/* Logout Tooltip */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <LogOut size={22} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-900 text-white border-slate-800 font-medium">
              <p>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
    </header>
  );
};

export default Navbar;