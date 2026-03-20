// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
// import { Field, FieldLabel } from "../components/ui/field";
// import { Separator } from "../components/ui/separator"; // If you have a separator component
import { User, Database } from "lucide-react";
import { useState } from "react";
import { Card } from "../components/ui/card";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";

const Setting = () => {
    const [activeTab, setActiveTab] = useState("general");
    const session=useLiveQuery(()=>db.session.toArray());
     const navigate = useNavigate(); 
     const [showpopup,setShwpopup]=useState(false)
    console.log(session)
    const sidebarItems = [
    { id: "general", label: "General", icon: <User className="w-4 h-4" /> },
    // { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    // { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "system", label: "System Data", icon: <Database className="w-4 h-4" /> },
  ];

  async function handleLogout() {
    await db.session.clear();
    navigate('/login');
  }

  return (
    <>


    <div className="p-6 bg-slate-50 lg:flex-none lg:min-h-screen ">
        <div className="max-w-6xl mx-auto">
            <span className="text-2xl font-extrabold">Settings</span>
            <p className="text-gray-600 ">Manage Your Account Settings And System Perferences.</p>
        </div>
        <div className="flex  flex-col lg:flex-row justify-center   mt-5 ">
            {/* navbar */}
            <div className="flex flex-col lg:flex-row gap-8" >
                <aside className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {sidebarItems.map(item=>(
                        <button onClick={()=>setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all  ${
                  activeTab === item.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                }`}>
                           <span>{item.label}</span>
                        </button>
                    ))}
                </aside>
            </div>
            {/* main context */}
            <div className="flex-1">
                    {session?.map(item=>(<Card className="shadow-sm bg-white rounded-2xl basis-1/2 ml-9 mt-4">
                    {activeTab === "general" &&
                    <div className="mx-4 m-1">
                        <div className="flex justify-between items-center mb-3 ">
                            <div><img src="/src/assets/Gemini_Generated_Image_chdnoechdnoechdn.png" className="rounded-full w-15"/></div>
                            <div className="mt-3 flex">
                                <i className="bi bi-trash text-red-600 text-xl mr-2 border p-1 rounded-md cursor-pointer border-gray-400"></i>
                              <div>
                                <label htmlFor="file-upload" 
                                    className="border-2 border-gray-500 px-4 py-1.5 rounded-2xl cursor-pointer inline-flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:border-gray-600 transition-colors duration-200 text-sm font-medium">
                                    <i className="bi bi-upload pr-2"></i>Upload
                                </label>
                                <input 
                                id="file-upload" 
                                type="file" 
                                className="hidden"  />
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="mt-3 flex justify-between  items-center mb-3">
                            <div className="flex flex-col  ">
                            <span className="font-bold">Name</span>
                        
                                <span className=" font-semibold text-gray-500">{item.username}</span>
                            </div>   
                            <div>
                                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                <i className="bi bi-pencil-square mr-2"></i>
                                Edit
                                </button>
                            </div>
                        </div>
                        <hr></hr>
                        <div className=" mt-3 flex justify-between items-center mb-3">
                            <div className="flex flex-col gap-2"><span className="font-bold">Contacts</span>
                            <span className="font-semibold text-gray-500">Email: {item.emailid}</span>
                            <span className="font-semibold text-gray-500">Phone:+91-636-73-987-23</span></div>
                            <div><button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                <i className="bi bi-pencil-square mr-2"></i>
                                Edit
                                </button></div>
                        </div>
                        <hr></hr>
                        <div className=" mt-3 flex justify-between items-center mb-3">
                            <div className="flex flex-col gap-2"><span className="font-bold">Social Mesia</span>
                            <span className="font-semibold text-gray-500">WebSite:  <a href="https://www.atribsglobal.com/">Atribsglobal.com</a> </span>
                            <span className="font-semibold text-gray-500">Linkedin:  <a href="https://www.linkedin.com/company/atribs/?originalSubdomain=in">AtribsLinkedin</a></span></div>
                            <div><button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                <i className="bi bi-pencil-square mr-2"></i>
                                Edit
                                </button></div>
                        </div>
                        <hr></hr>
                        <div className=" mt-3 flex justify-between items-center mb-3">
                            <div className="flex flex-col gap-2"><span className="font-bold">Language & Currency</span>
                            <span className="font-semibold text-gray-500">English</span>
                            <span className="font-semibold text-gray-500">INR</span></div>
                            <div><button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                <i className="bi bi-pencil-square mr-2"></i>
                                Edit
                                </button></div>
                        </div>
                    </div> 
                    }
                    {activeTab==="system" && 
                        <div className="m-3">
                            <div className="flex flex-col gap-1">
                                <span className="font-extrabold text-xl">System Management</span>
                                <span className="font-semibold  text-gray-500">Manage your local  database Storage.</span>
                            </div>
                            <div className="mt-10">
                            <div className="m-6 flex justify-between items-center bg-amber-200/50 p-4 rounded-2xl">
                                <div className="flex flex-col gap-1 ">
                                    <span className="font-bold text-amber-900/80">Clear Cache</span>
                                    <span>This will clear temporary session data</span>
                                </div>
                                <div><button className="bg-white px-4 py-2 rounded-xl font-bold text-orange-500/90 border border-orange-600 cursor-pointer" onClick={handleLogout}>Clear</button></div>
                            </div>
                            <div className="m-6">
                                <span className="text-red-600 font-bold flex items-center"><i className="bi bi-trash text-red-600 text-xl  mr-2  p-1 rounded-md cursor-pointer "></i>Danger Zone</span>
                                <div className="flex justify-between items-center bg-red-300/80 p-4 rounded-2xl">
                                    <span>Permanently delete all project and Employee data.</span>
                                    <button className="bg-red-500/90 px-3 py-2 rounded-xl font-semibold cursor-pointer" onClick={()=>setShwpopup(true)}>Reset Database</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    }
                </Card>))}
            </div>
        </div>
          {showpopup && (
            <div className="fixed inset-0 bg-black/10  flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-gray-100">
                {/* Icon for visual cue */}
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Data Base?
                </h3>
                <p className="text-gray-500 text-center mb-8">
                  Are you sure you want to delete this Data Base?
                </p>

                <div className="flex w-full gap-3">
                  <button
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    onClick={() => {
                      
                      setShwpopup(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95"
                    // onClick={Handeldelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
    </>
  );
}


export default Setting
