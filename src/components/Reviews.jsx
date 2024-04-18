import React from 'react'
import elipse from "../assets/Ellipse.png";
import elipse1 from "../assets/Ellipse1.png";
const Reviews = () => {
  return (
   <section className='mx-8 my-10 mb-20'>
    <h1 className='text-[56px] text-center mb-5'>Our student's perspective</h1>
    <p className='text-center text-[16px] mb-5'>Insights from Our Valued Students</p>
    
       <div className='flex flex-col gap-6'>
       <div className='md:py-5 md:w-[60%] md:px-8  py-3 px-4 border-[2px] items-start border-black rounded-md md:rounded-[50px] my-5'>
            <p className='md:text-[18px] text-[12px] font-[500] mb-6 md:mb-8'>Lorem ipsum dolor sit amet consectetur. Integer quis leo maecenas eu amet. At eu vitae sapien interdum sed et ac. Interdum non enim sed blandit vel nisl.</p>
            <div className='md:w-[20%] z-5 bg-white left-7 border-[2px] mt-[-15px] border-black absolute rounded-[50px]'>
                <img src={elipse1} alt="" />
            </div>
        </div>
        <div className='py-5 px-2  md:w-[60%] ml-auto border-[2px] border-black rounded-md   md:rounded-[50px] my-5 mr-2'>
            <p className='md:text-[18px] text-[12px] font-[500] mb-4 md:mb-8'>Lorem ipsum dolor sit amet consectetur. Integer quis leo maecenas eu amet. At eu vitae sapien interdum sed et ac. Interdum non enim sed blandit vel nisl.</p>
            <div className='md:w-[20%]  right-7   bg-white mt-[-15px] border-[2px]   border-black absolute rounded-[50px]'>
                <img className='ml-auto' src={elipse} alt="" />
            </div>
        </div>
       </div>
    <div className='clear-right'></div>
   </section>
  )
}

export default Reviews
