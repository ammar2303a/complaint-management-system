import axios, { all } from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function UserManage() {
  const [alluser, setUser] = useState([])
  const [selectedUserId, setSelectedUserId] = useState("");
  const [role, setRole] = useState("")
  
  console.log("Role change: ",role);
  

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/");
      setUser(res.data)

    } catch (error) {
      alert('Error fetching record User:', error)
    }
  }

  const roleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await axios.put(`http://localhost:3000/api/auth/${selectedUserId}`, {
      role: role,
    });

    alert("Role Updated Successfully");
    fetchUser();
  } catch (error) {
    alert("Role Update Failed");
  }
};

  
  const deleteEvent = async(id)=>{
    if(!window.confirm("Are you sure you want to delete this user?")) return
    try {
    await axios.delete(`http://localhost:3000/api/auth/${id}`)
    alert("user delete successfully");
    fetchUser();
    } catch (error) {
      alert("Delete Failed", error)
    }

   
  }

  useEffect(() => {
    fetchUser()
    console.log(alluser);


  }, [])

  return (
    <div style={{ marginLeft: "220px", padding: "20px" }} className='mt-3'>
      <div >
        <h2 className='mb-3 text-center'>User Managed</h2>
      </div>
      <span style={{backgroundColor: "grey", color: "white" }} className='btn'>Total Records: {alluser.length || 0}</span>


      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col">Update Role</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {alluser.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td><button className="btn btn-primary" onClick={() => setSelectedUserId(user._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Role Update</button></td>
              <td><button className='btn btn-danger' onClick={() =>deleteEvent(user._id)}>Delete</button></td>
            </tr>
          ))}


        </tbody>
      </table>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={roleSubmit}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Change Role</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">

                

                <div className="mb-2">
                  <label className="form-label">Role Assigned</label>
                  <select className="form-select" value={role} onChange={(e) =>setRole(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value={"user"}>
                      user
                    </option>
                    <option value={"worker"}>
                      worker
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

export default UserManage
