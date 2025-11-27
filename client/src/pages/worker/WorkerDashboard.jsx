import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useEffect } from "react";

function WorkerDashboardLayout() {
  const [allcomp, setAllcomp] =useState([])
  const [selectedId, setAllselectedId] = useState('')
  const [status, setStatus] = useState('') 
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
        const logoutSubmit = () => {
      setLoading(true);
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("isAdmin");
    setLoading(false); 
    navigate("/login");
  }, 1500); // 1 second delay
};

   

    const fetchComplaint = async()=>{
      const workerId = localStorage.getItem('id')
      const res = await axios.get(`http://localhost:3000/api/complaint/worker/${workerId}`)
      setAllcomp(res.data)
    }

     const  statusSubmit = async (e)=>{
      e.preventDefault()
      try {
        await axios.put(`http://localhost:3000/api/complaint/status/${selectedId}`,{
        status:status
      })
      alert("Status Updated Successfully");
    fetchComplaint();
      } catch (error) {
        alert("Status update Failed", error)
      }
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
        {allcomp.map((com, i)=>(
          <>
          <h3>Worker Panel</h3>
          <p>{com.workerId?.name}</p>
          <hr />
          </>
        ))}
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>Dashboard</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>Complaints</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>Profile</li>
          <li style={{ padding: "10px 0", cursor: "pointer", listStyle: "none" }}>
  {loading ? (
    <div style={styles.spinner}></div>   // spinner ghoomta hua
  ) : (
    <span onClick={logoutSubmit} style={{ color: "#fff" }}>
      Logout
    </span>
  )}
</li>

        </ul>
      </div>

      {/* Main Section */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa" }}>
  <h2>Assigned Complaints</h2>

  {/* Scroll area */}
  <div
    style={{
      marginTop: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      height: "500px",
      overflowY: "auto",
      padding: "20px",
      backgroundColor: "#fff",
    }}
  >
    {allcomp.length === 0 ? (
      <p>No complaints assigned.</p>
    ) : (
      allcomp.map((comp, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#fdfdfd",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
          }}
        >
          <h4 style={{ margin: 0 }}>{comp.name}</h4>

          <p style={{ margin: "5px 0" }}>
            <strong>Phone:</strong> {comp.complaintphone}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Address:</strong> {comp.address}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Complaint:</strong> {comp.complaintText}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Model:</strong> {comp.model?.name}
          </p>
          <p style={{ margin: "5px 0" }}> <strong>Status: </strong> <span style={{ color: comp.status === "pending" ? "orange" : "green" }}> {comp.status} </span> </p>
          <button className="btn btn-success" onClick={() => setAllselectedId(comp._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Change Status</button>
          {/* <p style={{ margin: "5px 0" }}>
            <strong>Status: </strong>
            <select
              value={comp.status}
              onChange={(e) => updateStatus(comp._id, e.target.value)}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </p> */}

          <p style={{ margin: "5px 0", fontSize: "12px", color: "#888" }}>
            <strong>Created:</strong> {new Date(comp.createdAt).toLocaleString()}
          </p>
        </div>
      ))
    )}
  </div>
</div>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={statusSubmit} >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Change Status</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">

                

                <div className="mb-2">
                  <label className="form-label">Status Update</label>
                  <select className="form-select" value={status} onChange={(e)=>setStatus(e.target.value)} 
                  >
                    <option value="">Select</option>
                    <option value={"pending"}>
                      pending
                    </option>
                    <option value={"in-progress"}>
                      in-progress
                    </option>
                    <option value={"completed"}>
                      completed
                    </option>
                    

                  </select>

                </div>
              </div>



              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  spinner: {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #fff",
  borderRadius: "50%",
  width: "18px",
  height: "18px",
  animation: "spin 1s linear infinite"
}
}
export default WorkerDashboardLayout;

