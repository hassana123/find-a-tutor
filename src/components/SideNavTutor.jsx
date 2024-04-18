import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BiEdit, BiTrash  } from 'react-icons/bi';
import {RiLogoutCircleLine,  RiHome4Line, RiGroup2Line, RiTimer2Line, RiInbox2Line, RiStarLine} from "react-icons/ri"
import star from "../assets/Star.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import image from "../assets/Ellipse1.png"
const SideNavTutor = ({show}) => {
  const [open, setOpen] =useState(false);
const navigate = useNavigate()
  const user = useContext(UserContext);
  //console.log(user);
  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  const handleLogout = () => {
    navigate('/');
    console.log("out");
    // Remove user data from local storage
    localStorage.removeItem('userTutorly');
    sessionStorage.removeItem('userTutorly');
    
  };
  return (
    <>
    {/**destop nav */}
    <nav className='bg-white py-10 w-[25%] md:block hidden'>
    <div className='flex justify-between items-center mx-5'>
      <div className='flex gap-3 itemscenter'>
        <img className='p-1 rounded-[50%] bg-[#F13E3E]' src={star} alt="" />
        <h1 className='text-[18px] shadow-sm  text-[#F13E3E] font-bold'>Tutorly</h1>
      </div>
      <IoEllipsisVertical onClick={()=>setOpen(!open)} className='cursor-pointer hover:text-[#F13E3E]'/>
    </div>
    {open?(
      <div className='absolute bg-white shadow-lg  lg:left-[6%] py-5 px-3'>
      <h1 className='font-semibold text-[14px] mt-10 mb-3'> Switch Account</h1>
     <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="/user-dashboard" className="flex hover:text-red-600 gap-2 items-center" > <img className='w-[50px] mx-auto'  src={image} alt="" />Dashboard</NavLink>
     <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="logout" className=" my-5 hover:text-red-600 flex gap-2 items-center"><RiLogoutCircleLine/>Logout</NavLink>
    <NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} className="my-5 hover:text-red-600 flex gap-2 items-center" to="/manage-profile"><BiEdit/> Manage Profile</NavLink>
    </div>
    ):(
      <></>
    )}
    <div className='mx-5'>
      <h1 className='font-bold text-[18px] my-10'>OVERVIEW</h1>

    <div className='space-y-5 text-[16px] font-semibold'>
    <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="/tutor-dashboard" className="flex hover:text-red-600 gap-2 items-center"> <RiHome4Line/> Dashboard</NavLink>
    
      <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="/tutor-sessions" className="flex  hover:text-red-600 gap-2 items-center"> <RiTimer2Line/> Session</NavLink>
      <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="/inbox" className="flex  hover:text-red-600 gap-2 items-center"><RiInbox2Line/>  Inbox</NavLink>
    </div>
    </div>
    <div className='my-10 w-[90%] shadow-md mx-auto text-center'>
      <img className='mx-auto my-5' src={image} alt="" />
      <h1 className='font-bold text-[18px] mb-1'>{getGreetingMessage()} {user?.name}</h1>
      <p className='text-[12px] mb-5'>Check Your Sessions and Accept your Bookings  </p>
      <div className='flex justify-center gap-5'>
        <button onClick={handleLogout} className="border p-3 block rounded-[50%]" ><FiLogOut/></button>
        <NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} className="border p-3 rounded-[50%]" to="/manage-profile"><BiEdit/></NavLink>
        <NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} className="border p-3 rounded-[50%]" to=""><BiTrash/></NavLink>
      </div>
    </div>
    <div className='mx-5 space-y-5'>
      <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="settings" className=" hover:text-red-600 flex gap-2 items-center"><FiSettings/> Settings</NavLink>
      <button onClick={handleLogout} className=" hover:text-red-600 flex gap-2 items-center"><RiLogoutCircleLine/>Logout</button>
    </div>
    </nav>
{/**mobile Nav */}
<>
{show?(
<nav className='bg-white shadow-md py-10 w-[65%] top-0 absolute md:hidden block'>
    <div className='flex justify-between items-center mx-5'>
      <div className='flex gap-3 itemscenter'>
        <img className='p-1 rounded-[50%] bg-[#F13E3E]' src={star} alt="" />
        <h1 className='text-[18px] shadow-sm  text-[#F13E3E] font-bold'>Tutorly</h1>
      </div>
     
    </div>
   
    <div className='mx-5'>
      <h1 className='font-bold text-[18px] my-10'>OVERVIEW</h1>

    <div className='space-y-5 text-[16px] font-semibold'>
    <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="/tutor-dashboard" className="flex hover:text-red-600 gap-2 items-center"> <RiHome4Line/> Dashboard</NavLink>
      <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="/tutor-sessions" className="flex  hover:text-red-600 gap-2 items-center"> <RiTimer2Line/> Session</NavLink>
      <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="/inbox" className="flex  hover:text-red-600 gap-2 items-center"><RiInbox2Line/>  Inbox</NavLink>
    </div>
    </div>
    <div className='my-10 w-[90%] shadow-md mx-auto text-center'>
      <img className='mx-auto my-5' src={image} alt="" />
      <h1 className='font-bold text-[18px] mb-1'>{getGreetingMessage()}, {user?.name}</h1>
      <p className='text-[12px] mb-5'> Check Your Sessions and Accept your Bookings </p>
      <div className='flex justify-center gap-5'>
        <button onClick={handleLogout} className="border p-3 block rounded-[50%]" ><FiLogOut/></button>
        <NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} className="border p-3 block rounded-[50%]" to="/manage-profile"><BiEdit/></NavLink>
        <NavLink style={({isActive})=>{
        return isActive?{color:"#F13E3E"}:{}
      }} className="border p-3 rounded-[50%]" to="/delete-account"><BiTrash/></NavLink>
      </div>
    </div>
    <div className='mx-5 space-y-5'>
      <NavLink style={({isActive})=>{
      return isActive?{color:"#F13E3E"}:{}
    }} to="settings" className=" hover:text-red-600 flex gap-2 items-center"><FiSettings/> Settings</NavLink>
      <button onClick={handleLogout} className=" hover:text-red-600 flex gap-2 items-center"><RiLogoutCircleLine/>Logout</button>
    </div>
    </nav>

):(
<></>
)}
</>
    </>  )
}

export default SideNavTutor;
