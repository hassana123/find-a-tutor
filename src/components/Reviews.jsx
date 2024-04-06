import React from 'react'
import elipse from "../assets/Ellipse.png";
import elipse1 from "../assets/Ellipse1.png";
const Reviews = () => {
  return (
   <section className='mx-8 my-10'>
    <h1 className='text-[56px] text-center mb-5'>Our student's perspective</h1>
    <p className='text-center text-[16px] mb-5'>Insights from Our Valued Students</p>
    
        <div className='py-5 w-[60%] px-8 border-[2px] border-black rounded-[50px] my-5'>
            <p className='text-[20px] font-[500] mb-8'>Lorem ipsum dolor sit amet consectetur. Integer quis leo maecenas eu amet. At eu vitae sapien interdum sed et ac. Interdum non enim sed blandit vel nisl.</p>
            <div className='w-[20%] z-5 bg-white left-7 border-[2px] mt-[-15px] border-black absolute rounded-[50px]'>
                <img src={elipse1} alt="" />
            </div>
        </div>
        <div className='py-5 px-2 w-[60%] border-[2px] border-black float-right clear-right rounded-[50px] my-5 mr-2'>
            <p className='text-[20px] font-[500] mb-8'>Lorem ipsum dolor sit amet consectetur. Integer quis leo maecenas eu amet. At eu vitae sapien interdum sed et ac. Interdum non enim sed blandit vel nisl.</p>
            <div className='w-[20%]  bg-white mt-[-15px] right-7 border-[2px]   border-black absolute rounded-[50px]'>
                <img className='float-right' src={elipse} alt="" />
            </div>
        </div>
    <div className='clear-right'></div>
   </section>
  )
}

export default Reviews
