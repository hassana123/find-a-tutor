import React, { useContext } from 'react'
import star from "../../assets/Star.svg"
import { UserContext } from '../../UserContext'
import { FiUser } from 'react-icons/fi'

const ChatNav = () => {
  const user = useContext(UserContext)
  return (
    <div className='grid grid-cols-2 items-center  mt-3 text-[#F13E3E]'>
     {/* <div className='flex justify-between my-5 items-center mx-5 '>
     <div className='flex gap-3 items-center'>
       <img className='p-1 rounded-[50%] bg-[#F13E3E]' src={star} alt="" />
       <h1 className='text-[18px] shadow-sm  text-[#F13E3E] font-bold'>Tutorly</h1>
     </div>
     </div>
     <div className="mx-auto">
       {user?.profilePicture? <img   className="w-[50px] rounded-full h-[50px]" src={user?.profilePicture} alt="" />: <FiUser   className="w-[50px] rounded-full h-[50px] mx-auto"/>}
        <span>{user?.name}</span> 
      </div> */}
    </div>
  )
}

export default ChatNav;