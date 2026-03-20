import { Component } from '../../components/ui/button-5'
import { RevenuePieChart } from '../../components/Maincomponent/Piechart';
import { 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  Briefcase,
  TrendingUp,
} from "lucide-react";

import Chartbar from '../../components/Maincomponent/Chartbar';

const Dasboard = () => {
  return (
    <>
      <div>
        <header className="flex flex-col lg:flex-row  justify-between">
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl">Dasboard</span>
            <span className="font-semibold text-slate-400">Welcome back! Here's What happening with your project today</span>
          </div>
          <div className="flex items-center gap-2 justify-between items-center">
              <Component/>
              <button className='bg-black text-white px-3 rounded-md cursor-pointer'>Manage Team</button>
          </div>
        </header>

        {/* navcontent  */}
        <div className='grid grid-cols-1 lg:grid-cols-4 '>
          <div className='mt-6 p-3 bg-white w-50 rounded-xl'>
            <div className='flex justify-between  '>
              <span className='text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors italic'>Total Revenue</span>
              <span className='p-1 rounded-lg bg-gray-200   text-slate-600 '><CreditCard className="h-4 w-4" /></span>
            </div>
            <div className='mt-6'>
              <div className="text-2xl font-bold tracking-tighter">$45,231.89</div>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs font-bold flex items-center px-1.5 py-0.5 rounded
                       bg-emerald-100/70 text-emerald-600 dark:bg-emerald-500/10">
                       <ArrowUpRight className="h-3 w-3 mr-0.5" />
                       +20.1%
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-none">
                      From last Month
                    </span>
                  </div>
            </div>
          </div>
          {/* 2card */}
          <div className='mt-6 p-3  bg-white w-50 rounded-xl'>
            <div className='flex justify-between '>
              <span className='text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors italic'>Active Employees</span>
              <span className='p-1 rounded-lg bg-gray-200   text-slate-600 '><Users className="h-4 w-4" /></span>
            </div>
            <div className='mt-6'>
              <div className="text-2xl font-bold tracking-tighter">2,350</div>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs font-bold flex items-center px-1.5 py-0.5 rounded
                       bg-emerald-100/70 text-emerald-600 dark:bg-emerald-500/10">
                       <ArrowUpRight className="h-3 w-3 mr-0.5" />
                       +180
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-none">
                      New This Month
                    </span>
                  </div>
            </div>
          </div>

          {/* card 3 */}
          <div className='mt-6 p-3  bg-white w-50 rounded-xl'>
            <div className='flex justify-between '>
              <span className='text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors italic'>Active Projects </span>
              <span className='p-1 rounded-lg bg-gray-200   text-slate-600 '><Briefcase className="h-4 w-4" /></span>
            </div>
            <div className='mt-6'>
              <div className="text-2xl font-bold tracking-tighter">132</div>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs font-bold flex items-center px-1.5 py-0.5 rounded
                       bg-emerald-100/70 text-emerald-600 dark:bg-emerald-500/10">
                       <ArrowUpRight className="h-3 w-3 mr-0.5" />
                       +12%
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-none">
                      Growth Rate
                    </span>
                  </div>
            </div>
          </div>

          {/* card 4*/}
          <div className='mt-6 p-3  bg-white w-50 rounded-xl'>
            <div className='flex justify-between '>
              <span className='text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors italic'>Total Revenue</span>
              <span className='p-1 rounded-lg bg-gray-200   text-slate-600 '><TrendingUp className="h-4 w-4" /></span>
            </div>
            <div className='mt-6'>
              <div className="text-2xl font-bold tracking-tighter">$45,231.89</div>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs font-bold flex items-center px-1.5 py-0.5 rounded
                       bg-emerald-100/70 text-emerald-600 dark:bg-emerald-500/10">
                       <ArrowUpRight className="h-3 w-3 mr-0.5" />
                       +20.1%
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-none">
                      From last Month
                    </span>
                  </div>
            </div>
          </div>
          
        </div>
        {/* chart bar */}
          <div className='hidden lg:block mt-8' >
          <Chartbar/>
          </div>
          <div className='block lg:hidden mt-8'>
            <RevenuePieChart/>
          </div>
      </div>
    </>
  )
}

export default Dasboard
