import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
   
    

    const loginSubmit = async (e)=>{
        e.preventDefault();
       try {
         const res = await axios.post("http://localhost:3000/api/auth/login", {email,password});
        localStorage.setItem('token', res.data.token)
      localStorage.setItem('isAdmin', res.data.user.isAdmin)
      localStorage.setItem('id', res.data.user.id)
      localStorage.setItem('role', res.data.user.role)
        alert("Login Successfull")
        setEmail("")
        setPassword("")
        if (res.data.user.isAdmin) {
  navigate('/admin')
} else if (res.data.user.role === "worker") {
  navigate('/worker')
} else {
  navigate("/")
}

        
       } catch (error) {
        alert("Login Failed")
       }
    }
  return (
      <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-4 shadow">
              <h3 className="text-center mb-3">Login</h3>
              <form onSubmit={loginSubmit}>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}  className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Password
                  </label>
                  <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}  className="form-control" id="email" />
                </div>
                <p className='text-center' style={{"textDecoration": "none"}}>You dont't have an Account ?<Link to="/register"> Register</Link></p>
              
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
