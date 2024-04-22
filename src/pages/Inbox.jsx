import React from 'react'
import requireAuth from '../requireAuth';
import SideBar from "../components/chatComponent/SideBar";
import DashboardLayout from '../components/DashboardLayout';
import Chat from '../components/chatComponent/Chat';
const Inbox = () => {
  return (
    <DashboardLayout>
      <main className='flex mx-auto w-[90%] h-[100vh] overflow-hidden my-2'>
      <SideBar  />
      <Chat/>
    </main>
    </DashboardLayout>
    
  )
}

export default requireAuth(Inbox);
