import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {
  const navigate = useNavigate()
  const [allproduct, setAllproduct] = useState([]);
  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [complaintphone, setComplaintphone] = useState('')
  const [address, setAddress] = useState('')
  const [complaintText, setComplaintText] = useState('')
  const [model, setModel] = useState('')

const fetchProducts = async ()=>{
  const res = await axios.get("http://localhost:3000/api/product/");
  setAllproduct(res.data)
} 

useEffect(()=>{
  fetchProducts();
  const id = localStorage.getItem('id')
  console.log("Get User Id :", id);
			setUserId(id)
  
},[])

  const complaintSubmit = async (e)=>{
    e.preventDefault()
    try {
      const complaintData = {
        userId, name, complaintphone, address, complaintText, model
      }
      await axios.post("http://localhost:3000/api/complaint/create", complaintData)
      alert("Complaint Posted Succesfuly")
      setName('')
      setComplaintphone('')
      setAddress('')
      setComplaintText('')
      setModel('')
    } catch (error) {
      alert("Complaint Posting Failed", error)
    }
  }
  const handleuser = ()=>{
    const token = localStorage.getItem('token')

    if (!token) {
      alert("please login first");
      navigate('/login')
      return;
    }
    const complModal = new window.bootstrap.Modal(document.getElementById("exampleModal"));
    complModal.show()
  }
  return (
     <div>
        <div className="container m-3">
            <div className="col-md-4 m-3"></div>
       <button type="button" className="btn btn-primary m-3" onClick={handleuser} data-bs-toggle="modal" >
  Complain
</button>
        </div>
   {/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <form onSubmit={complaintSubmit}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Complaint</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div className="modal-body">

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="form-control" placeholder="Enter Name" />
          </div>

          {/* Complaint Phone */}
          <div className="mb-3">
            <label className="form-label">Complaint Phone</label>
            <input type="text" value={complaintphone} onChange={(e)=> setComplaintphone(e.target.value)} className="form-control" placeholder="Enter Complaint Phone" />
          </div>

          {/* Address - Textarea */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea className="form-control" value={address} onChange={(e)=> setAddress(e.target.value)} rows="2" placeholder="Enter Address"></textarea>
          </div>

          {/* Complaint Text - Textarea */}
          <div className="mb-3">
            <label className="form-label">Complaint Text</label>
            <textarea className="form-control" value={complaintText} onChange={(e)=> setComplaintText(e.target.value)} rows="3" placeholder="Describe your complaint"></textarea>
          </div>

          {/* Model */}
          <div className="mb-3">
            <label className="form-label">Model</label>
            <select className="form-select" value={model} onChange={(e)=>setModel(e.target.value)}
									>
										<option value="">Select</option>  {/* ← Empty value agar select nahi hua */}
										{allproduct.map((prod, index)=>(
                      	<option key={index} value={prod._id} >
												{prod.model}
										</option>
                    ))}
											
											
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

export default Home
