import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { NavLink } from 'react-router-dom'
import { FiBell ,FiPlay, FiMoreVertical } from 'react-icons/fi';
import stars from "../assets/stars.svg";
const DashHero = () => {
    const user = useContext(UserContext);
    // console.log(user);
    //console.log(JSON.parse(sessionStorage.getItem("userTutorly")));
  return (
   <>
   <section className='text-white bg-[#F13E3E] py-5 md:flex justify-between items-center mx-5 rounded-md px-5'>
   <div className='md:w-[50%]'>
   <small className='text-[12px] mb-5 block text-gray-200'>Tutorly</small>
    {user?.isTutor? (
        <div className="text-3xl font-semibold mb-5">Welcome, Unlock Your Potential with Professional Peer Tutors</div>
    ):(
        <>
        <h1 className='text-[24px] font-semibold mb-5'>Sharpen  Your Skills With
Professional Peer Tutors</h1>
{user?.applicationPending?
(
<button  disabled={user?.applicationPending} className="flex gap-3 items-center bg-black lg:w-[60%] w-[90%] rounded-[50px] py-3 justify-center">Application Pending </button>
)
:
(
<NavLink to="/tutor-application" className="flex gap-3 items-center bg-black lg:w-[60%] w-[90%] rounded-[50px] py-3 justify-center">Join Now as a Tutor <FiPlay color='black' size={40} className='p-2  rounded-[50%] bg-white'/></NavLink>
)
}
        </>
    )}
   </div>
   <div>
  <img className='md:float-left float-right md:mt-0 mt-[-200px]' src={stars} alt=""/>
<div className='float-end'>

</div>
   </div>
   </section >
   <section className='mx-5 gap-5 my-10 grid md:grid-cols-3'>
    <div className='flex items-center justify-center  gap-4 bg-white shadow-md py-5 px-3'>
    <FiBell size={50} color='#F13E3E' className='lg:p-2 cursor-pointer r lg:rounded-[50%]  lg:bg-[rgba(241,62,62,0.5)]'/> 
    <h1>
        <small className="block mb-1">Todo</small>
        Mathematics
    </h1>
    <FiMoreVertical className="cursor-pointer"/>
    </div>
    <div className='flex items-center justify-center  gap-4 bg-white shadow-md py-5 px-3'>
    <FiBell size={50} color='#F13E3E' className='lg:p-2 cursor-pointer r lg:rounded-[50%]  lg:bg-[rgba(241,62,62,0.5)]'/> 
    <h1>
        <small className="block mb-1">Todo</small>
        Mathematics
    </h1>
    <FiMoreVertical className="cursor-pointer"/>
    </div>
    <div className='flex items-center justify-center  gap-4 bg-white shadow-md py-5 px-3'>
    <FiBell size={50} color='#F13E3E' className='lg:p-2 cursor-pointer r lg:rounded-[50%]  lg:bg-[rgba(241,62,62,0.5)]'/> 
    <h1>
        <small className="block mb-1">Todo</small>
        Mathematics
    </h1>
    <FiMoreVertical className="cursor-pointer"/>
    </div>
       </section>
   </>
  )
}

export default DashHero
