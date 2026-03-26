import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { useEffect, useState } from "react";
import { db, type Employessdatatype } from "../db";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../components/ui/avatar"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
// import { useDispatch } from 'react-redux'
import { useLiveQuery } from "dexie-react-hooks";
import { Avatar } from '../components/ui/avatar'
import Showprojectemp from "../components/Maincomponent/Showprojectemp";
export default function Projects() {
  const dbdata=useLiveQuery(()=>db.ProjectTable.toArray())
  const [showForm, setShowForm] = useState(false);
  const [projecttitle,setProjecttitle]=useState<string>('');
  const [projectstatus,setProjectStatus]=useState<string>('');
  const [description,setDescription]=useState<string>('');
  const [deadline, setDeadline]=useState<string>('');
  const [taskrange,setTaskrange]=useState<number>(0);
  const [editdata,setEditdata]=useState<Employessdatatype|null>(null);
  const [showview,setShowview]=useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null);
const [showProjectemp,setShowprojectemp]=useState(false)
  const [errors,setError]=useState({
    projecttitle:"",
    Workstatus:"",
  }
  )
console.log(dbdata)

  async function Addprojectdb(){
    let newerror={
      projecttitle:"",
      Workstatus:"",
    }
    if(projecttitle.trim()==="" ){
      newerror.projecttitle="Project title is Requred"
     
    }
    if( description.trim()===""){
      newerror.Workstatus="Project work status is Requred"
      
    }
    setError(newerror)
    if(newerror.projecttitle || newerror.projecttitle)return;

    try{
        await db.ProjectTable.add({
        Projecttitle:projecttitle,
        projectdescription:description,
        status:projectstatus,
        progress:taskrange,
        deadline:deadline,
        StartDate:new Date(),
      })
      setProjecttitle('');
      setProjectStatus('');
      setTaskrange(0);
      setDeadline('');
      setDescription('');
      setShowForm(false)
    }
    catch(error){
      console.log(error,"this the error ")
    }
    
  }
  function handeleditshow(projectdata:Employessdatatype|any){
    setEditdata(projectdata);
    setProjecttitle(projectdata.Projecttitle);
    setDescription(projectdata.projectdescription);
    setProjectStatus(projectdata.status);
    setDeadline(projectdata.deadline);
    setTaskrange(projectdata.progress);
    setShowForm(true)

  }
  async function handelUpdate() {
    if(!editdata)return;
    await db.ProjectTable.update(editdata.id!,{
      Projecttitle:projecttitle,
      projectdescription:description,
      status:projectstatus,
      deadline:deadline,
      progress:taskrange,
    })
    setEditdata(null);
    setProjecttitle('');
    setDescription('');
    setProjectStatus('');
    setDeadline('');
    setTaskrange(0);
    setShowForm(false)

  }
useEffect(()=>{
  function handelkeyDown(e:KeyboardEvent){
    if(e.key==="Enter"){
      if((e.target as HTMLElement).tagName==="TEXTAREA")return;
      if(showForm){
        Addprojectdb();
      }
    }
    if(e.key==='Escape'){
      if(showForm){
        setShowForm(false);
      }
    }
  }
  window.addEventListener('keydown',handelkeyDown);
  return ()=>window.removeEventListener('keydown',handelkeyDown)
},[showForm])

  return (
   <>
   <div className="flex flex-col h-full">
    {/* top data */}
    <div className="flex flex-col lg:flex-row justify-between ">
      <div><h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Projects</h1></div>
      <div className="flex mt-3 ">
        <button className="inline-flex w-full items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200" onClick={()=>setShowForm(true)}>+New Project</button>
        <div >
          {showForm && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-scroll lg:overflow-hidden">
                                <div
                                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-[6px] transition-opacity duration-300"
                                  onClick={() => setShowForm(false)}
                                ></div>
                                <div className="relative  overflow-scroll w-full max-w-[700px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-y-scroll transform transition-all animate-in fade-in zoom-in duration-200">
                                  
                                  <div className="px-8 pt-8 pb-4">
                                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                                     Project details
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">Fill in the details to manage your team.</p>
                                  </div>

                                  <div className="px-8 pb-4 space-y-6 ">
                                    {/* Name Input */}
                                    <div className=" f">
                                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                                        Project title
                                      </label>
                                      <input
                                        type="text"
                                        value={projecttitle}
                                        placeholder="e.g. John Doe"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                        onChange={(e)=>setProjecttitle(e.target.value)} 
                                      />
                                      {errors.projecttitle && <p className="text-red-500 font-semibold">{errors.projecttitle}</p>}
                                    </div>

                                    {/* Role Select */}
                                  <div className="flex flex-col lg:flex-row justify-between items-center">
                                    <div className="">
                                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                                        Status
                                      </label>
                                      <Select value={projectstatus} onValueChange={setProjectStatus} >{/*value={role} onValueChange={setRole}*/}
                                        <SelectTrigger className="w-full h-12 w-60 bg-slate-50 border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                                          <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                          <SelectItem value="Active" className="py-3 cursor-pointer">Active</SelectItem>
                                          <SelectItem value="Completed" className="py-3 cursor-pointer">Completed</SelectItem>
                                          <SelectItem value="In Progress" className="py-3 cursor-pointer">In Progress</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    {/* Email Input */}
                                    <div className="">
                                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                                        Image
                                      </label>
                                      <input
                                        type="file"
                                        placeholder="name@company.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                        
                                      />
                                    </div>
                                  </div>
                                    {/* Status Radio Group */}
                                    <div className="">
                                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                                        Work Status
                                      </label>
                                      <div className="">

                                        <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                        value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Project description"> 
                                         </textarea>
                                         {errors.Workstatus && <p className="text-red-500 font-semibold">{errors.Workstatus}</p>}
                                      </div>
                                    </div>
                                    <div className="flex-col flex justify-between lg:flex-row   items-center ">
                                      <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                              Intensity Level
                                            </label>
                                        <input type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={taskrange}
                                        onChange={(e)=>setTaskrange(Number(e.target.value))}
                                         className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"/>
                                         <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
                                          <span>0%</span>
                                          <span>50%</span>
                                          <span>100%</span>
                                        </div>
                                        </div>
                                      <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                                    Target Date
                                                  </label>
                                        <input type="date" 
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 outline-none ring-offset-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                                        value={deadline} onChange={(e)=>{setDeadline(e.target.value)}}/>
                                        {/* <Example/> */}
                                       
                                      </div>
                                    </div>
                                      

                                    {/* Action Buttons */}
                                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                                      <button
                                        className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                                        onClick={() => setShowForm(false)}
                                      >
                                        Cancel
                                      </button>

                                      <button
                                        className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95 transition-all"
                                        onClick={editdata?handelUpdate:Addprojectdb}
                                       >
                                      {editdata ? "Update Project": "Add Project"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                        )}
        </div>
        </div>
    </div>
    <div className="grid lg:grid-cols-3 gap-2 mt-5 ">
      {dbdata?.map((item)=>(
        <Card className="w-[300px] overflow-hidden hover:shadow-lg transition mb-4">

          {/* Image */}
          <div className="relative  h-40 w-full ">

            <img
              // src={item.image}
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
              alt="project"
              className="w-full h-full object-cover" />

            <div className="absolute top-2 right-2">
              <Badge className={`bg-transparent/25 ${item.status === "Active" ? "text-blue-600" : item.status === "Completed" ? "text-green-400" : "text-orange-500"} border border-gray-50 px-4`}>
                {item.status}
              </Badge>
            </div>

          </div>

          {/* Content */}
          <CardHeader>

            <CardTitle className="text-lg  capitalize ">
              <div className="flex justify-between">
                {item.Projecttitle}
                <i className="bi bi-three-dots text-slate-500"></i>
              </div>
            </CardTitle>

            <CardDescription className="capitalize mt-1 text-slate-500 font-semibold">
              {item.projectdescription}
            </CardDescription>

            {/* Progress */}
            <div className="m-2 w-60">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500/50 font-bold">PROGRESS</span>
                <span className="font-bold">{item.progress}%</span>
              </div>

              <div className="bg-gray-200 h-2 rounded mt-1">
                <div className="bg-blue-700/80 h-2 rounded " style={{ width: `${item.progress}%` }} />
              </div>
            </div>
            <div className="mt-2">
              <span className="border border-slate-500 rounded-xl hover:shadow-2xl bg-gray-100 shadow-gray-500 py-2 px-5 font-semibold text-slate-500"><i className="bi bi-calendar2-week pr-2 "></i> Due: {item.deadline}</span>
            </div>
            <div className="flex flex-row items-center justify-center  w-45  mt-4">
              {/* <AnimatedTooltip items={people}  /> */}

            </div>

          </CardHeader>

          <CardFooter className="flex gap-2">
            <Button size="sm" className="flex-1 cursor-pointer" onClick={() => { setShowview(true); setSelectedProject(item); } }>
              View
            </Button>

            <Button size="sm" variant="outline" className="flex-1 cursor-pointer" onClick={() => handeleditshow(item)}>
              Edit
            </Button>
          </CardFooter>

        </Card>
      ))}
    </div>

    {/* View card section */}
      {showview && selectedProject && (
        <div className="fixed inset-0 backdrop-blur-[6px] flex justify-center items-center z-50 ">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto   ">

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <img 
                  src="/pwa-192x192.png" 
                  alt="Project Avatar" 
                  className="w-16 h-16 rounded-xl object-cover shadow-sm border border-slate-100"
                />
                <div>
                  <h2 className="font-bold text-2xl text-slate-800">{selectedProject.Projecttitle}</h2>
                  <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 mt-2">
                    {selectedProject.status}
                  </span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg  ">
                <i className="bi bi-three-dots text-xl"></i>
              </button>
            </div>

            <hr className="border-t border-slate-100 my-8" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Start Date</span>
                <span className="font-medium text-slate-800 text-lg">May 2, 2019</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</span>
                <span className="font-medium text-slate-800 text-lg">{selectedProject.deadline}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</span>
                  <span className="text-xs font-bold text-blue-600">{selectedProject.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-1">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${selectedProject.progress}%` }} 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Team</span>
                {/* <div className="flex -space-x-2 overflow-hidden mt-1">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Member" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="Member" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="Member" />
                  <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 text-xs font-medium text-slate-600">
                    +2
                  </div>
                </div> */}
                <AvatarGroup className="grayscale" onClick={()=>{setShowprojectemp(true)}}>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                  </AvatarGroup>
              </div>
              
            </div>

            <hr className="border-t border-slate-100 my-8" />
{showProjectemp &&
                <Showprojectemp/>
                }
            {/* Project Details Section */}
            <div className="text-slate-600 leading-relaxed">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Project Overview</h3>
              <p className="text-slate-500">
                Detailed description of the project goes here. This space allows for a breakdown of goals, 
                current blockers, or recent updates to ensure the whole team is aligned.
              </p>
            </div>
            <div className="flex justify-end ">
               <button
               className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-red-400 cursor-pointer"
                onClick={() => setShowview(false)}>
                Cancel </button>
            </div>
          </div>
  </div>
)}
   </div>
   </>
  )
}