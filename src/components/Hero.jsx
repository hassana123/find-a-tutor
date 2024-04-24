import React from 'react'
import image1 from "../assets/bukS.jpg"
import image from "../assets/imagesBuk.jpg"
import { NavLink } from 'react-router-dom'
const Hero = () => {
 
  return (
    <section className='text-black text-[18px]'>
        <div className='md:flex  justify-between items-center mx-5 my-10'>
            <div className=' r  font-[400]'>
            <img className='w-[50%] rounded-lg -rotate-6 my-5  md:hidden mx-auto  rounded-0' src={image1} alt="" />
                <h1 className='md:text-[36px]  text-[20px] font-[700] mb-5'>Unlock Your Potential with Personalized Tutoring Solutions</h1>
                <p className=' mb-10 '>Experience empowerment in your learning journey through personalized guidance designed specifically for your needs.
                </p>
              <div className='lg:flex gap-5 mr-5'>
                
              <NavLink to="/tutors" className=" bg-[#FF6F61]  text-[16px] text-white text-center w-[50%] py-[12px] rounded-[8px] hover:bg-white hover:text-[#ff6f61] border border-[#ff6f61] block my-5" >Find a Tutor</NavLink>
                <NavLink to="tutor-registration" className="border text-[#FF6F61] border-[#FF6F61]  text-[16px] hover:bg-[#ff6f61] hover:text-white w-[50%] text-center py-[12px] rounded-[8px] block my-5" >Become a Tutor</NavLink>
 
              </div>
            </div>
            <img className='w-[50%] transform -rotate-3 rounded-md h-[80vh] hidden md:block' src={image1} alt="" />
        </div>
        <div  className='md:flex justify-between items-center mx-5 my-10'>
<img className='w-[58%] mx-auto -rotate-3 rounded-lg my-8 md:my-0 ' src={image} alt="" />
<div className=''>
  <h1 className='md:text-[48px] text-[20px] font-[700] mb-5 '>Medium length section heading goes here</h1>
  <p className='mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
  <NavLink to="tutor-registration" className="bg-[#FF6F61] inline-block text-[16px] text-white px-[24px] py-[12px] rounded-[8px]">Become a Tutor</NavLink>
 
</div>
        </div>
    </section>
  )
}

export default Hero
