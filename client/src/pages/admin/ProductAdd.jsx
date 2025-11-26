import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ProductAdd() {
    const [products, setProduct] = useState([])
    const [model, setModel] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    const prodSubmit = async (e)=>{
        const prodData ={
            model,
            name,
            price:Number(price),
            quantity:Number(quantity)
        }
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/product/create", prodData)
            alert("Product Added Successfully")
            setModel('');
            setName('');
            setPrice('');
            setQuantity('');
            fetchProduct();
           
        } catch (error) {
            alert("Product Insertion Failed", error)
        }
        
    }
    

    const fetchProduct = async()=>{
      const res =  await axios.get("http://localhost:3000/api/product/");
      setProduct(res.data)   
    }

    useEffect(()=>{
        fetchProduct()
        console.log(products);
        

    },[])

    const deleteEvent = async (id)=>{
        if(!window.confirm("Are you sure you want to delete this product?")) return

        try {
            await axios.delete(`http://localhost:3000/api/product/${id}`)
            alert("Product Delete Successfully")
            fetchProduct()
        } catch (error) {
            alert("Deleting Failed", error)
        }
    } 
  return (
     <div style={{ marginLeft: "220px", padding: "20px" }} className='mt-3'>
      <div >
        <h2 className='mb-3 text-center'>Product Manage</h2>
      </div>
         <button type="button" className="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add Product
</button>
<span style={{backgroundColor: "grey", color: "white" }} className='btn'>Total Products: {products.length || 0}</span>

<table className="table text-center">
        <thead>
          <tr>
            <th scope="col">Model</th>
            <th scope="col">name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index)=>(
            <tr key={index}>
              <td>{prod.model}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.quantity}</td>
              <td><button className='btn btn-danger' onClick={()=> deleteEvent(prod._id)}>Delete</button></td>
            </tr>
          ))}
            
        


        </tbody>
      </table>


   {/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <form onSubmit={prodSubmit} >
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Product</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        
        <div className="mb-3">
          <label className="form-label">Model</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)}  className="form-control" placeholder="Enter Model" />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}  className="form-control" placeholder="Enter Name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}  className="form-control" placeholder="Add Price" />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control" placeholder="Add quantity" />
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

export default ProductAdd
