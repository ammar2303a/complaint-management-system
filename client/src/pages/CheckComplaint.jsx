import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CheckComplaint() {
    const [allcomp, setAllcomp] = useState([])

    const fetchComp = async()=>{
        const res = await axios.get("http://localhost:3000/api/complaint/")
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
                <td>Sample issue 1</td>
                <td>Pending</td>
                <td>Worker Name</td>
                <td>0000000000</td>
                <td>Model Name</td>
                <td>DD/MM/YYYY</td>
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
