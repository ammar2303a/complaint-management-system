import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'


const AdminLayout = ({ children }) => {
    return (
       
        <>
        <Navbar/>
        <Sidebar/>
        {children}
        </>
          
    )
}

export default AdminLayout
