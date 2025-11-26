import {BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from 'react'
import Home from './pages/Home'
import Register from "./pages/Register"
import Login from "./pages/Login"
import UserLayout from "./components/user/UserLayout"
import AdminLayout from "./components/admin/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import UserManage from "./pages/admin/UserManage"
import ProductAdd from "./pages/admin/ProductAdd"
import WorkerLayout from "./components/worker/WorkerLayout"
import WorkerDashboard from "./pages/worker/WorkerDashboard"
import ComplaintAssign from "./pages/admin/ComplaintAssign"

function App() {
  
  function PrivateRoutes({children, adminOnly, workerOnly}){
    const token = localStorage.getItem("token");
     const role = localStorage.getItem("role");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if(!token) return <Navigate to={"/login"}/>
      if(adminOnly && !isAdmin) return <Navigate to={"/"}/>
      if(workerOnly && role !== "worker") return <Navigate to={"/"}/>

      return children
      
  }

  return (
    // <BrowserRouter>   
    //   <Nav />   
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter>
    <Routes>
      <Route path="/*" element={
        <UserLayout>
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
          </Routes>
        </UserLayout>
      }/>

      <Route path="/admin/*" element={
       <PrivateRoutes adminOnly={true}>
         <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/user" element={<UserManage/>}/>
            <Route path="/complaint" element={<ComplaintAssign/>}/>
            <Route path="/product" element={<ProductAdd/>}/>
          </Routes>
        </AdminLayout>
       </PrivateRoutes>
      }/>

      <Route path="/worker/*" element={
        <PrivateRoutes workerOnly={true}>
          <WorkerLayout>
            <Routes>
              <Route path="/" element={<WorkerDashboard />}/>
            </Routes>
          </WorkerLayout>
        </PrivateRoutes>
      }/>
    </Routes>
    </BrowserRouter>

    
  )
}

export default App
