import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import star from "../assets/Star.svg"
import { IoEllipsisVertical } from 'react-icons/io5'
const Navbar = () => {
  const [show, setShow] = useState(false)
  return (
   <>
    <nav className='flex justify-between items-center py-3 w-[95%]  mx-auto  text-[16px]'>
    <div className='flex gap-2 items-center'>
       <img className='p-1 rounded-[50%] bg-[#F13E3E]' src={star} alt="" />
       <h1 className='text-[18px] shadow-sm  text-[#F13E3E] font-bold'>Tutorly</h1>
     </div>
       <div className='w-[65%] lg:flex justify-between  hidden'>
       <div  className='font-[600]   space-x-10 py-1 text-[#333333]  text-[16px]'>
<NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} to="/" className=" hover:text-[#FF6F61] ">Home</NavLink>
<NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} to="/tutors"  className=" hover:text-[#FF6F61] ">Find a Tutor</NavLink>
<NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} to="/about"  className=" hover:text-[#FF6F61] ">About Us</NavLink>
<NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} to="/contact-us"  className=" hover:text-[#FF6F61] ">Contact Us</NavLink>

        </div>
        <div className='space-x-5 font-[400]  md:block'>
            <NavLink  style={({isActive})=>{
        return isActive?{transform:"tranform scale-110"}:{}
      }} className="border border-[#FF6F61] px-[20px] py-[8px] rounded-[8px] text-[#ff6f61]" to="/login">Login</NavLink>
            <NavLink to="/sign-up" className="bg-[#FF6F61]  px-[20px] py-[8px] rounded-[8px] text-white">Sign Up</NavLink>
        </div>
       </div>
       <div className='lg:hidden'>
       <IoEllipsisVertical onClick={()=>setShow(!show)} className='cursor-pointer hover:text-[#F13E3E]'/>
       </div>
    </nav>
   
    
    {show &&       <div className='w-[65%] px-5 z-10 md:block bg-white shadow-lg py-20 absolute right-5  lg:hidden'>
       <div  className='font-[600]   grid  space-y-3 py-1 text-[#333333] text-[16px]'>
<NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }}  to="/" className="hover:text-[#FF6F61] ">Home</NavLink>
<NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} to="/tutors"  className=" hover:text-[#FF6F61]  ">Find a Tutor</NavLink>
<NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} to="/about"  className="hover:text-[#FF6F61]  ">About Us</NavLink>
<NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} to="/contact-us"  className="hover:text-[#FF6F61]  ">Contact Us</NavLink>

        </div>
        <div className='grid space-y-5 font-[400] text-center my-5'>
            <NavLink className="border md:w-[50%] hover:bg-[#FF6F61] hover:text-white border-[#FF6F61] px-[20px] py-[8px] rounded-[8px] text-[#ff6f61]" to="/login">Login</NavLink>
            <NavLink to="/sign-up" className="md:w-[50%] border-[#FF6F61] border  bg-[#FF6F61] hover:bg-transparent hover:text-[#FF6F61]  px-[20px] py-[8px] rounded-[8px] text-white">Sign Up</NavLink>
        </div>
       </div>}
   
   </>
  )
}

export default Navbar
