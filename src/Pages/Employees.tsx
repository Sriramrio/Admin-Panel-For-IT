import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { useEffect, useState } from "react";
import { db, type employeetype, type Employessdatatype } from "../db";
import { useLiveQuery } from "dexie-react-hooks";
import { ParticleButton } from "../components/ui/particle-button";
import { DropdownMenu } from "../components/ui/dropdown-menu";
import { Pencil, Trash, ArrowDownUp, User } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search } from "lucide-react";

const Employees = () => {
  const empdata = useLiveQuery(() => db.Employeesdata.toArray());
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("Active");
  const [name, setName] = useState("");
  const [role, setRole] = useState<string | undefined>(undefined);

  const [email, setEmail] = useState("");
  const [eerror, setnewError] = useState({
    username: "",
    email: "",
    duplicatemail: "",
  });
  const [editdata, setEditdata] = useState<employeetype | null>(null);
  const [Statusdata, setStatusdata] = useState("All");
  const [Rolefilter, setRolefilter] = useState("All");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showdata, setShowdata] = useState("Card");
  const [showpopup, setShwpopup] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ FIX 2: empproject uses undefined instead of empty string
  const [empproject, setEmpproject] = useState<string | undefined>(undefined);

  const [filterproject, setFilterProject] = useState("All");
  const [searchinput, setSearchinput] = useState<string>("");
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\.[a-zA-Z]{2,}$/;

  console.log(empdata);

  async function handelAddEmployees() {
    let newErrors = {
      username: "",
      email: "",
      duplicatemail: "",
    };

    if (name.trim() === "") {
      newErrors.username = "Name Required";
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter Correct format";
    }

    setnewError(newErrors);

    if (newErrors.username || newErrors.email || newErrors.duplicatemail) {
      return;
    }
    try {
      const id = await db.Employeesdata.add({
        Employeename: name,
        Role: role ?? "",
        Emailid: email,
        status: status,
        empProject: empproject ?? "",
      });
      setName("");

      // ✅ FIX 3: reset to undefined not empty string
      setRole(undefined);
      setEmail("");
      setEmpproject(undefined);
      setStatus("Active");
      setShowForm(false);
      console.log(id);
    } catch (error) {
      console.log(error, "this error ");
    }
  }

  // handel show edit
  function handeleditshow(emp: Employessdatatype | any) {
    setEditdata(emp);
    setName(emp.Employeename);

    // ✅ FIX 4: use undefined fallback not empty string
    setRole(emp.Role || undefined);
    setEmail(emp.Emailid);
    setStatus(emp.status);
    setEmpproject(emp.empProject || undefined);
    setShowForm(true);
  }

  async function handelUpdate() {
    if (!editdata) return;
    await db.Employeesdata.update(editdata.id!, {
      Employeename: name,
      Role: role ?? "",
      Emailid: email,
      status: status,
      empProject: empproject ?? "",
    });
    setEditdata(null);
    setName("");

    // ✅ FIX 5: reset to undefined not empty string
    setRole(undefined);
    setEmail("");
    setEmpproject(undefined);
    setStatus("Active");
    setShowForm(false);
  }

  function handleSort(field: string) {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  const processedEmployees = [...(empdata ?? [])]
    .filter((emp) => {
      const statusmatch = Statusdata === "All" || emp.status === Statusdata;
      const rolematch = Rolefilter === "All" || emp.Role === Rolefilter;
      const Projectmatch =
        filterproject === "All" || emp.empProject === filterproject;
      const searchmatch =
        emp.Emailid?.toLowerCase().includes(searchinput.toLowerCase()) ||
        emp.Employeename?.toLowerCase().includes(searchinput.toLowerCase()) ||
        emp.Role?.toLowerCase().includes(searchinput.toLowerCase()) ||
        emp.empProject?.toLowerCase().includes(searchinput.toLowerCase());

      return statusmatch && rolematch && Projectmatch && searchmatch;
    })
    .sort((a: any, b: any) => {
      if (!sortField) return 0;

      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

  function handelclear() {
    setRolefilter("All");
    setStatusdata("All");
    setFilterProject("All");
  }

  async function Handeldelete() {
    if (deleteId === null) return;
    await db.Employeesdata.delete(deleteId);
    setDeleteId(null);
    setShwpopup(false);
  }

  useEffect(() => {
    function handelkeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if ((event.target as HTMLElement).tagName === "TEXTAREA") return;
        if (showForm) {
          if (editdata) {
            handelUpdate();
          } else {
            handelAddEmployees();
          }
        }
      }
      if (event.key === "Escape") {
        if (showForm) setShowForm(false);
        if (showpopup) {
          setShwpopup(false);
          setDeleteId(null);
        }
      }
    }
    window.addEventListener("keydown", handelkeyDown);
    return () => {
      window.removeEventListener("keydown", handelkeyDown);
    };
  }, [showForm, showpopup, editdata, name, email, role, status]);

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-8 sm:px-4 md:px-6">
        {/* header */}
        <div className="">
          <div className="flex flex-col lg:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Employees
            </h1>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200"
              onClick={() => {
                setShowForm(true);
              }}
            >
              <span className="text-md">+</span>New Employee
            </button>
          </div>
        </div>

        {/* filter card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-row sm:flex-col sm:gap-4 gap-3">
            <div className="flex flex-col lg:flex-row gap-3">
              <p className="flex items-center justify-between mb gap-2 text-sm font-bold text-slate-400 uppercase mr-2">
                Filter By:
              </p>

              {/* Role Filter */}
              <Select value={Rolefilter} onValueChange={setRolefilter}>
                <SelectTrigger className="w-[180px] rounded-xl border-slate-200 focus:ring-indigo-500 text-sm font-bold text-slate-400">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Roles</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Tester">Tester</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={Statusdata} onValueChange={setStatusdata}>
                <SelectTrigger className="w-[180px] rounded-xl border-slate-200 focus:ring-indigo-500/20 text-sm font-bold text-slate-400">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Leave">Leave</SelectItem>
                </SelectContent>
              </Select>

              {/* Project Filter */}
              <Select value={filterproject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-[180px] rounded-xl border-slate-200 focus:ring-indigo-500/20 text-sm font-bold text-slate-400">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Projects</SelectItem>
                  {[...new Set(empdata?.map((item) => item.empProject))]
                    .filter(Boolean)
                    .map((project) => (
                      // ✅ FIX 6: filter out empty/undefined values before rendering SelectItem
                      <SelectItem key={project} value={project!}>
                        {project}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="relative hidden md:block group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search everything..."
                  value={searchinput}
                  onChange={(e) => setSearchinput(e.target.value)}
                  className="bg-slate-50 border-transparent border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2 w-64 lg:w-80 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex-col sm:flex gap-4">
            <div>
              <ParticleButton successDuration={1000} variant="default">
                <button onClick={handelclear}>Clear !</button>
              </ParticleButton>
            </div>
            <div className="hidden lg:block">
              <DropdownMenu
                options={[
                  {
                    label: "Table",
                    onClick: () => setShowdata("Table"),
                    Icon: <i className="bi bi-table"></i>,
                  },
                  {
                    label: "Card",
                    onClick: () => setShowdata("Card"),
                    Icon: <i className="bi bi-boxes"></i>,
                  },
                ]}
              >
                {showdata || "Show"}
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div>
          <div className="">
            <div className="sm:flex flex-col overflow-auto lg:m-1 flex-row gap-5 justify-between"></div>

            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-[6px] transition-opacity duration-300"
                  onClick={() => setShowForm(false)}
                ></div>
                <div className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
                  <div className="px-8 pt-8 pb-4">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                      {editdata ? "Edit Employee" : "New Employee"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Fill in the details to manage your team.
                    </p>
                  </div>

                  <div className="px-8 pb-8 space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                        onChange={(e) => setName(e.target.value)}
                      />
                      {eerror.username && (
                        <p className="text-red-500 ml-3 font-semibold">
                          {eerror.username}
                        </p>
                      )}
                    </div>

                    {/* Role + Project Selects */}
                    <div className="flex justify-between">
                      {/* Role Select */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                          Professional Role
                        </label>
                        <Select
                          value={role ?? ""}
                          onValueChange={(val) =>
                            setRole(val === "" ? undefined : val)
                          }
                        >
                          <SelectTrigger className="w-45 h-12 bg-slate-50 border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                            <SelectItem value="Developer" className="py-3 cursor-pointer">
                              Developer
                            </SelectItem>
                            <SelectItem value="Tester" className="py-3 cursor-pointer">
                              Tester
                            </SelectItem>
                            <SelectItem value="HR" className="py-3 cursor-pointer">
                              HR
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Project Select */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                          Project
                        </label>
                        <Select
                          value={empproject ?? ""}
                          onValueChange={(val) =>
                            setEmpproject(val === "" ? undefined : val)
                          }
                        >
                          <SelectTrigger className="w-45 h-12 bg-slate-50 border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                            <SelectValue placeholder="Select Project" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                            <SelectItem value="Website Redesign" className="py-3 cursor-pointer">
                              CRM Project
                            </SelectItem>
                            <SelectItem value="Mobile App Development" className="py-3 cursor-pointer">
                              Mobile App Development
                            </SelectItem>
                            <SelectItem value="This demo project 1" className="py-3 cursor-pointer">
                              This demo project 1
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        placeholder="name@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {eerror.email && (
                        <p className="text-red-500 ml-3 font-semibold">
                          {eerror.email}
                        </p>
                      )}
                    </div>

                    {/* Status Radio Group */}
                    <div className="space-y-3">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                        Work Status
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <label
                          className={`flex items-center justify-center gap-2 border-2 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                            status === "Active"
                              ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                              : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                          }`}
                        >
                          <input
                            type="radio"
                            className="hidden"
                            value="Active"
                            checked={status === "Active"}
                            onChange={(e) => setStatus(e.target.value)}
                            name="userStatus"
                          />
                          <span
                            className={`w-2 h-2 rounded-full ${
                              status === "Active" ? "bg-indigo-500" : "bg-slate-300"
                            }`}
                          ></span>
                          <span className="font-medium">Active</span>
                        </label>

                        <label
                          className={`flex items-center justify-center gap-2 border-2 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                            status === "Leave"
                              ? "bg-amber-50 border-amber-500 text-amber-700"
                              : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                          }`}
                        >
                          <input
                            type="radio"
                            className="hidden"
                            value="Leave"
                            checked={status === "Leave"}
                            onChange={(e) => setStatus(e.target.value)}
                            name="userStatus"
                          />
                          <span
                            className={`w-2 h-2 rounded-full ${
                              status === "Leave" ? "bg-amber-500" : "bg-slate-300"
                            }`}
                          ></span>
                          <span className="font-medium">On Leave</span>
                        </label>
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
                        onClick={editdata ? handelUpdate : handelAddEmployees}
                      >
                        {editdata ? "Update Details" : "Create Profile"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Table Section */}
          {showdata === "Table" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="cursor-pointer hover:text-indigo-600 transition-colors py-4 px-6">
                        #
                      </TableHead>
                      <TableHead
                        onClick={() => handleSort("Employeename")}
                        className="cursor-pointer hover:text-indigo-600 transition-colors py-4 px-6"
                      >
                        <div className="flex items-center gap-1">
                          Employee <ArrowDownUp size={15} />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:text-indigo-600 transition-colors py-4 px-6">
                        Role
                      </TableHead>
                      <TableHead 
                        onClick={() => handleSort("Emailid")}
                        className="cursor-pointer hover:text-indigo-600 transition-colors py-4 px-6"
                      >
                        <div className="flex items-center gap-1">
                          Email <ArrowDownUp size={15} />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:text-indigo-600 transition-colors py-4 px-6">
                        Status
                      </TableHead>
                      <TableHead className="cursor-pointer hover:text-indigo-600 transition-colors py-4 px-6 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {processedEmployees?.map((emp, i) => (
                      <TableRow key={emp.id}>
                        <TableCell className="px-4">
                          <span>{i + 1}</span>
                        </TableCell>
                        <TableCell className="flex items-center gap-3 py-4 px-6">
                          <img
                            src={`https://i.pravatar.cc/40?img=${emp.id}`}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-semibold text-slate-800 uppercase">
                            {emp.Employeename}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-600 font-medium">
                          {emp.Role}
                        </TableCell>
                        <TableCell className="text-slate-500 px-6">
                          {emp.Emailid}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-600">
                            {emp.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-3">
                          <div className="flex items-center gap-3">
                                {/* Edit Button */}
                                <button
                                  onClick={() => handeleditshow(emp)}
                                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95 shadow-sm"
                                >
                                  <Pencil size={14} strokeWidth={2.5} />
                                  <span>Edit</span>
                                </button>

                                {/* Delete Button */}
                                <button
                                  onClick={() => {
                                    setDeleteId(emp.id!);
                                    setShwpopup(true);
                                  }}
                                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg transition-all duration-200 hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95 shadow-sm"
                                >
                                  <Trash size={14} strokeWidth={2.5} />
                                  <span>Delete</span>
                                </button>
                              </div>
                                                      </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Delete Popup */}
          {showpopup && (
            <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-gray-100">
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
                  Delete Record?
                </h3>
                <p className="text-gray-500 text-center mb-8">
                  Are you sure you want to delete this record?
                </p>
                <div className="flex w-full gap-3">
                  <button
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    onClick={() => {
                      setDeleteId(null);
                      setShwpopup(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95"
                    onClick={Handeldelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Card Section */}
          {/* {showdata === "Card" && (
            <div className="p-4 lg:grid grid-cols-3 gap-3">
              {processedEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="flex justify-between border rounded-xl p-4 shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">  
                      <img
                        src={`https://i.pravatar.cc/40?img=${emp.id}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold uppercase">
                          {emp.Employeename}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">
                        <span className="font-medium text-black">Email:</span>{" "}
                        {emp.Emailid}
                      </p>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Role:</span> {emp.Role}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                          {emp.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 mt-3">
                      <button
                        className="text-blue-500 hover:text-blue-700 border-2 rounded-md px-2 py-1"
                        onClick={() => handeleditshow(emp)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 border-2 rounded-md px-2 py-1"
                        onClick={() => {
                          setDeleteId(emp.id!);
                          setShwpopup(true);
                        }}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )} */}
          {showdata === "Card" && (
  <div className="p-6 bg-slate-50/50 min-h-screen">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {processedEmployees.map((emp) => (
        <div
          key={emp.id}
          className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-blue-500/20"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar with subtle ring */}
              <div className="relative">
                {/* <img
                  src={`https://i.pravatar.cc/150?u=${emp.id}`}
                  alt={emp.Employeename}
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm"
                /> */}
                <p className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm flex items-center justify-center text-2xl font-extrabold"><User/></p>
                <span className="absolute -bottom-1 -right-1 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 leading-tight">
                  {emp.Employeename}
                </h3>
                <p className="text-sm font-medium text-blue-600/80">
                  {emp.Role}
                </p>
              </div>
            </div>

            {/* Top Right Actions */}
            <div className="flex gap-1">
              <button
                onClick={() => handeleditshow(emp)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit Employee"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => {
                  setDeleteId(emp.id!);
                  setShwpopup(true);
                }}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Employee"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-50 space-y-3">
            {/* Email Info */}
            <div className="flex items-center text-sm text-slate-600">
              <svg className="w-4 h-4 mr-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{emp.Emailid}</span>
            </div>

            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Current Status
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${emp.status?.toLowerCase() === 'active' 
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20' 
                  : 'bg-slate-100 text-slate-700 ring-1 ring-slate-600/10'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${emp.status?.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                {emp.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
      </div>
    </>
  );
};

export default Employees;