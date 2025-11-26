import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const registerSubmit = async (e)=>{
        e.preventDefault();
        // const registerData = {
        //     name,
        //     email,
        //     password,
        //     phone
        // }

        await axios.post("http://localhost:3000/api/auth/create", {name, email, password, phone});
        alert("Register Successfull")
        navigate("/login")

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
              <h3 className="text-center mb-3">Register Contact</h3>
              <form onSubmit={registerSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Password
                  </label>
                  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Phone
                  </label>
                  <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" id="email" />
                </div>
                <p className='text-center' style={{"textDecoration": "none"}}>Already have an Account ?<Link to="/login"> Login</Link></p>
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

export default Register
