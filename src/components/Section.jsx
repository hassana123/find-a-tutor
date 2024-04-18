import React from 'react'
import {NavLink} from "react-router-dom"
import group from "../assets/Group.png"
import team from "../assets/team.png"
import rectangle from "../assets/Rectangle.png"
const Section = () => {
  return (
    <section className='text-[#33333]  my-10'>
      <h1 className='text-center  text-[40px] font-[700] mb-5'>Services Offered</h1>
      <p className='text-[16px] text-center mb-5'>Dive into Our Range of Tailored Tutoring Solutions</p>
      <div className='grid md:grid-cols-2 lg::grid-cols-3 mx-8 gap-10'>
      <div className='shadow-lg bg-white p-5 '>
  <img className='mx-auto my-10' src={group} alt="" />
  <h1 className='text-[22px] font-[700] mb-5'>Personalized Tutor Matching</h1>
  <p className='text-[18px] mb-10'>Let us take the hassle out of finding the perfect tutor for you. Our tutor matching service carefully evaluates your needs, preferences, and learning style to pair you with the ideal tutor who can help you achieve your academic goals.</p>
  <NavLink className="border border-[#FF6F61] hover:bg-[#FF6F61] font-[300] text-[16px] hover:text-white rounded-[12px] px-[18px] py-[8px]">Learn More</NavLink>
</div>
<div className='shadow-lg bg-white p-5 '>
<img className='mx-auto my-10' src={team} alt="" />
  <h1  className='text-[22px] font-[700] mb-5'>Personalized One-on-One Tutoring</h1>
  <p className='text-[18px] mb-10'>Receive individualized attention and guidance from expert tutors in a wide range of subjects tailored to your learning style and pace.</p>
  <NavLink className="border border-[#FF6F61] hover:bg-[#FF6F61] font-[300] text-[16px] hover:text-white rounded-[12px] px-[18px] py-[8px]">Learn More</NavLink>
</div>
<div className='shadow-lg bg-white p-5 '>
<img className='mx-auto my-10' src={rectangle} alt="" />
  <h1  className='text-[22px] font-[700] mb-5'>Exam Prep Made Simple</h1>
  <p className='text-[18px] mb-10'>Prepare for exams, with our experienced  peer tutors. Gain confidence and achieve your target scores with personalized study plans and practice sessions.</p>
  <NavLink className="border border-[#FF6F61] hover:bg-[#FF6F61] font-[300] text-[16px] hover:text-white rounded-[12px] px-[18px] py-[8px]">Learn More</NavLink>
</div>

      </div>
      
    </section>
  )
}

export default Section
