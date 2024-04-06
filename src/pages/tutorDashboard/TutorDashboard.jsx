import React from 'react'
import requireAuth from '../../requireAuth'
import TutorDashboardLayout from '../../components/TutorDashboardLayou'
const TutorDashboard = () => {
  return (
    <TutorDashboardLayout>
        <div>
      hey
    </div>
    </TutorDashboardLayout>
  )
}

export default requireAuth(TutorDashboard, true)
