import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useEffect } from "react";

function WorkerDashboardLayout() {
  const [allcomp, setAllcomp] =useState([])
    const navigate = useNavigate()
    const logoutSubmit = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("role")
         localStorage.removeItem("isadmin")
        navigate("/login")

    }

    const fetchComplaint = async()=>{
      const res = await axios.get("http://localhost:3000/api/complaint/")
      setAllcomp(res.data)
    }
    useEffect(()=>{
      fetchComplaint()
    },[])
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        backgroundColor: "#343a40",
        color: "#fff",
        padding: "20px"
      }}>
        <h3>Worker Panel</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>Dashboard</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>Complaints</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>Profile</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }} onClick={logoutSubmit}>Logout</li>
        </ul>
      </div>

      {/* Main Section */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa" }}>
        <h2>Assigned Complaints</h2>
        <div style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          minHeight: "400px",
          padding: "20px",
          backgroundColor: "#fff"
        }}>
          {allcomp.map((comp, index)=>(
            <div key={index}>
            <h4>Customer name</h4><span>{comp.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default WorkerDashboardLayout;

