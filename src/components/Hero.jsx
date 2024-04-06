import React from 'react'
import image1 from "../assets/Image1.png"
import image from "../assets/Image.png"
import { NavLink } from 'react-router-dom'
const Hero = () => {
  const user = JSON.parse(localStorage.getItem("userTutorly")) || JSON.parse(sessionStorage.getItem("userTutorly"))
console.log(user.uid);
  return (
    <section className='text-black text-[18px]'>
        <div className='flex justify-between items-center mx-5 my-10'>
            <div className='border border-red-400  font-[400]'>
                <h1 className='text-[56px] font-[700] mb-5'>Unlock Your Potential with Personalized Tutoring Solutions</h1>
                <p className=' mb-10 '>Experience empowerment in your learning journey through personalized guidance designed specifically for your needs.
                </p>
              
                <NavLink to="/tutors" className="inline-block bg-[#FF6F61]  text-[16px] text-white px-[24px] py-[12px] rounded-[8px] hover:bg-white hover:text-[#ff6f61] border border-[#ff6f61]" >Find a Tutor</NavLink>
                <NavLink to="tutor-registration" className=" mx-8 border text-[#FF6F61] border-[#FF6F61] inline-block text-[16px] hover:bg-[#ff6f61] hover:text-white px-[44px] py-[12px] rounded-[8px]" >Become a Tutor</NavLink>
 
            </div>
            <img className='w-[50%]' src={image1} alt="" />
        </div>
        <div  className='flex justify-between items-center mx-5 my-10'>
<img className='w-[58%]' src={image} alt="" />
<div className='border border-red-500'>
  <h1 className='text-[48px] font-[700] mb-5 '>Medium length section heading goes here</h1>
  <p className='mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
  <NavLink to="tutor-registration" className="bg-[#FF6F61] inline-block text-[16px] text-white px-[24px] py-[12px] rounded-[8px]">Become a Tutor</NavLink>
 
</div>
        </div>
    </section>
  )
}

export default Hero
