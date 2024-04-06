import React from 'react';
import requireAuth from '../requireAuth';
import DashboardLayout from '../components/DashboardLayout';
import DashHero from '../components/DashHero';
import DashSection from '../components/DashSection';
import SearchComponent from '../components/SearchComponent';
const Dashboard = () => {
  return (
    <DashboardLayout>
   <SearchComponent/>
<DashHero/>
<DashSection/>
    </DashboardLayout>
  )
}

export default requireAuth(Dashboard);