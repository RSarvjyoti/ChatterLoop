import React from 'react'
import logo from '../assets/logo.png'

const Authlayout = ({children}) => {
  return (
    <>
    <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
        <img src={logo} alt="logo" width="80px" height='60px'/>
    </header>
    {
        children
    }
    </>
  )
}

export default Authlayout