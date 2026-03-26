import { Component } from '../../components/ui/button-5'
import { RevenuePieChart } from '../../components/Maincomponent/Piechart';
import { Attendschart } from '../../components/Maincomponent/Attendschart'
import { 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  Briefcase,
  TrendingUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";

import Chartbar from '../../components/Maincomponent/Chartbar';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, } from '../../db';


const Dasboard = () => {
  const projectdata=useLiveQuery(()=>db.ProjectTable.toArray())??[];
  console.log(projectdata)
  const employeedataExcel = useLiveQuery(() => db.Employeesdata.toArray())??[];
   
  return (
    <>
      <div id="dashboard-report" className=' md:p-4 space-y-6'>
        <header className="flex flex-col lg:flex-row md:flex-row justify-between">
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl">Dashboard</span>
            <span className="font-semibold text-slate-400">Welcome back! Here's What happening with your project today</span>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center ">
              <Component projectdata={projectdata} employeedata={employeedataExcel}  />
              <button className='bg-black text-white px-3 py-1 rounded-md cursor-pointer'>Manage Team</button>
          </div>
        </header>

        {/* navcontent  */}
        <div className='grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 '>
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
        <div className='flex-col lg:flex flex-row gap-3'>
          <div className='hidden lg:block mt-8 md:block w-full' >
          <Chartbar/>
          </div>
          <div className='block md:hidden lg:hidden mt-8'>
            <RevenuePieChart/>
          </div>

          <div className='bg-white mt-8 w-full rounded-2xl border border-gray-300'>
            <div className='p-4'><span className='font-bold'>Project List </span></div>
            <div>
              <div className=" max-w-full p-5 rounded-md ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Project Name</TableHead>
                <TableHead className='font-bold'>Status</TableHead>
                {/* <TableHead className="w-[250px]">Progress</TableHead> */}
                {/* <TableHead className="text-right">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectdata?.map((project) => (
                <TableRow key={project.id}>
                  
                  {/* Project Name */}
                  <TableCell className="font-medium">
                    {project.Projecttitle}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <Badge >
                      {project.progress} %
                    </Badge>
                  </TableCell>

                  {/* Progress Bar & Text */}
                  {/* <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="w-8 text-xs font-medium text-right text-muted-foreground">
                        {project.progress}%
                      </span>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </TableCell> */}

                  {/* Actions (Ghost Button) */}
                  {/* <TableCell className="text-right">
                    <Button variant="ghost" size="icon" title="Edit Project">
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell> */}

                </TableRow>
              ))}
            </TableBody>
          </Table>
             </div>
            </div>
          </div>
        </div>

        {/* attends chart bar  */}
        <div className='mt-8 w-[320px] md:w-[650px] lg:w-full '><Attendschart/> </div>  {/*w-[320px] md:w-[650px] lg:*/}
      </div>
    </>
  )
}

export default Dasboard
