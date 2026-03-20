// import './App.css' 
// import Login from './Pages/Login'
// import Register from './Pages/Register'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dasboard from './AppComponents/Home/Dasboard';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import AdminLayout from './AppComponents/Layout/AdminLayout';
// import Employees from './Pages/Employees';


// export default function App() {
//   return (
//     <>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Register/>}/> 
//         <Route path='/login' element={<Login/>}/> 
       
//         <Route path='/admin' element={<AdminLayout/>}/>
//           <Route index element={<Dasboard/>}/>
//           <Route path='employees' element={<Employees/>}/>
//         {/* <Route path="projects" element={</>} /> */}
      
//       </Routes>
//     </BrowserRouter>
    
//     </>
//   )
// }

import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dasboard from './AppComponents/Home/Dasboard'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AdminLayout from './AppComponents/Layout/AdminLayout'
import Employees from './Pages/Employees'
import Project from './Pages/Project'
import Setting from './Pages/Setting'

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public pages */}
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

        {/* Admin layout */}
        <Route path="/admin" element={<AdminLayout/>}>

          <Route index element={<Dasboard/>}/>
          <Route path="employees" element={<Employees/>}/>
          <Route path="project" element={<Project/>}/>
          <Route path='setting' element={<Setting/>}/>
        </Route>

      </Routes>

    </BrowserRouter>
  )
}