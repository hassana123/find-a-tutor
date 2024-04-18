import React from 'react'
import { NavLink } from 'react-router-dom'
import facebook from "../assets/Facebook.svg";
import ig from "../assets/Instagram.svg";
import x from "../assets/X.svg";
import youtube from "../assets/Youtube.svg";
import likedln from "../assets/LinkedIn.svg";
const Footer = () => {
  return (
    <footer className='mx-8 mt-[70px]'>
      <div className='md:flex justify-between'>
        <h1 className='text-[25px] font-bold my-5 md:my-0'>Tutorly</h1>
        <div className='font-[600] text-[16px] space-x-5 mb-10'>
<NavLink>Home</NavLink>
<NavLink>About</NavLink>
<NavLink>tutor</NavLink>
<NavLink>tutorly</NavLink>
        </div>
        <div className='space-x-2  flex items-center'>
          <img src={facebook} alt="" />
          <img src={ig} alt="" />
          <img src={youtube} alt="" />
          <img src={x} alt="" />
          <img src={likedln} alt="" />
        </div>
      </div>
      <hr/>
      <div className='text-[14px] my-5 md:flex md:justify-between items-center grid md:space-y-0 space-y-2 text-center mt-10 space-x-5'>
        <NavLink>2024 Tutorly. All right reserved.</NavLink>
        <NavLink>Privacy Policy</NavLink>
        <NavLink>Terms of Service</NavLink>
        <NavLink>Cookies Settings</NavLink>
      </div>
    </footer>
  )
}

export default Footer
