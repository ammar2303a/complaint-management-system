import React from 'react'
import { Children } from 'react'
import Nav from './Nav'
import Footer from './Footer'



const UserLayout = ({children})=> {
  return (
   <>
    <Nav/>
    {children}
    <Footer/>
   </>
  )
}

export default UserLayout
