import React from 'react'
import DashboardLayout from '../components/DashboardLayout';
import requireAuth from '../requireAuth';
import TutorApplication from '../components/TutorApplication'
const TutorApplicationForm = () => {
  return (
    <DashboardLayout>
        <TutorApplication/>
    </DashboardLayout>
  
  )
}

export default requireAuth(TutorApplicationForm);
