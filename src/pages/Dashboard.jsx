import React from 'react';
import requireAuth from '../requireAuth';
import DashboardLayout from '../components/DashboardLayout';
import DashHero from '../components/DashHero';
import DashSection from '../components/DashSection';
import SearchComponent from '../components/SearchComponent';
import TutorDashboard from '../components/TutorDashboard';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
const Dashboard = () => {
  const {user} =useContext( UserContext)
  return (
    <DashboardLayout>
   <SearchComponent/>
   <DashHero/>
   {user?.isTutor?<TutorDashboard/>:<>
   
<DashSection/>
   </>}

    </DashboardLayout>
  )
}

export default requireAuth(Dashboard);