import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CheckComplaint() {
    const [allcomp, setAllcomp] = useState([])

    const fetchComp = async()=>{
      const userId = localStorage.getItem("id")
        const res = await axios.get(`http://localhost:3000/api/complaint/mycomplaint/${userId}`)
        setAllcomp(res.data)
    }

    useEffect(()=>{
        fetchComp();
    },[])
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-100" style={{ maxWidth: '1000px' }}>
        <h2 className="text-center mb-4">My Complaints</h2>

        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Complaint ID</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Worker Name</th>
                <th>Worker Phone</th>
                <th>Model Name</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {allcomp.map((comp, i)=>(
                <tr key={i}>
                <td>{comp._id}</td>
                <td>{comp.complaintText}</td>
                <td style={{
                  color: comp.status === "pending" ? "orange":
                  comp.status === "in-progress" ? "green":
                  comp.status === "completed" ? "red": "black"
                }}>{comp.status}</td>
                <td>{comp.workerId?.name}</td>
                <td>{comp.workerId?.phone}</td>
                <td>{comp.model?.name}</td>
                <td>{comp.createdAt}</td>
              </tr>
              ))}
              

           
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CheckComplaint;
