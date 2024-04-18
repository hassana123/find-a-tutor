import React, { useState } from 'react';
import DashSideNav from './DashSideNav';
import star from "../assets/Star.svg";
import { IoEllipsisVertical } from 'react-icons/io5';
import { UserProvider } from '../UserContext';
const DashboardLayout = ({ children }) => {
const [show, setShow] = useState(false);
  return (
     <UserProvider>
       <main className='bg-gray-100  md:flex'>
        <DashSideNav show={show}/>
    <section className='md:w-[75%]'>
    <div className='flex justify-between mb-10 py-3 items-center mx-5 md:hidden'>
      <div className='flex gap-3 itemscenter'>
        <img className='p-1 rounded-[50%] bg-[#F13E3E]' src={star} alt="" />
        <h1 className='text-[18px] shadow-sm  text-[#F13E3E] font-bold'>Tutorly</h1>
      </div>
      <IoEllipsisVertical onClick={()=>setShow(!show)} className='cursor-pointer hover:text-[#F13E3E]'/>
    </div>
        {children}
    </section>
    </main>
     </UserProvider>
 
  );
};

export default DashboardLayout;
