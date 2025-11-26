import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function ComplaintAssign() {
    const [allcomp, setAllcomp] = useState([])

    const fetchComp = async ()=>{
        const res = await axios.get("http://localhost:3000/api/complaint/")
        setAllcomp(res.data)
    }

    useEffect(()=>{
        fetchComp();
    },[])
  return (
    <div style={{ marginLeft: "220px", padding: "20px" }} className='mt-3'>
      <div >
        <h2 className='mb-3 text-center'>Complaint Manage</h2>
      </div>
      <span style={{backgroundColor: "grey", color: "white" }} className='btn'>Total Complaints: {allcomp.length || 0}</span>

      <div className="container">
        <div className="row">
            <div className="col-md-12">
                <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone No</th>
            <th scope="col">Address</th>
            <th scope="col">Issues</th>
            <th scope="col">Model NO</th>
            <th scope="col">Model Name</th>
            <th scope="col">Status</th>
            <th scope="col">Assign</th>
          </tr>
        </thead>
        <tbody>
          {allcomp.map((comp, index)=>(
             <tr key={index} >
              <td>{comp.name}</td>
              <td>{comp.complaintphone}</td>
              <td>{comp.address}</td>
              <td>{comp.complaintText}</td>
              <td>{comp.model?.model}</td>
              <td>{comp.model?.name}</td>
              <td>{comp.status}</td> 
              <td><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Send worker</button></td>
              {/* <td><button className='btn btn-danger' onClick={()=> deleteEvent(prod._id)}>Delete</button></td> */}
            </tr>
          ))}
           
        
            
        


        </tbody>
      </table>
            </div>
        </div>
      </div>

       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Change Role</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">

                

                <div className="mb-2">
                  <label className="form-label">Select Worker</label>
                  <select className="form-select"
                  >
                    <option value="">Select</option>
                    <option value={"user"}>
                      user
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

      
  )
}

export default ComplaintAssign
