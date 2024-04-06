import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className='md:flex justify-between items-center py-3 w-[90%]  mx-auto  border border-red-400 text-[16px]'>
        <h1 className='text-[#FF6F61] text-[30px] font-bold'>Tutorly</h1>
        <div className='font-[600] space-x-10 py-1 text-[#333333] border border-red-400 text-[16px]'>
<NavLink to="/" className=" ">Home</NavLink>
<NavLink to="/find-a-tutor"  className=" ">Find a Tutor</NavLink>
<NavLink to="/about"  className=" ">About Us</NavLink>
<NavLink to="/contact-us"  className=" ">Contact Us</NavLink>

        </div>
        <div className='space-x-5 font-[400]'>
            <NavLink className="border border-[#FF6F61] px-[20px] py-[8px] rounded-[8px] text-[#ff6f61]" to="/login">Login</NavLink>
            <NavLink to="/sign-up" className="bg-[#FF6F61]  px-[20px] py-[8px] rounded-[8px] text-white">Sign Up</NavLink>
        </div>
    </nav>
  )
}

export default Navbar
