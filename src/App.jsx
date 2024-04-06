import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TutorDashboard from './pages/tutorDashboard/TutorDashboard';
import TutorApplicationForm from './pages/TutorApplicationForm';
import Tutor from './pages/Tutor';
import AllTutors from './pages/AllTutors';
import { UserProvider } from './UserContext';
import AdminDashboard from './pages/admin/AdminDashboard';
import Sessions from './pages/Sessions';
import TutorSessions from './pages/tutorDashboard/TutorSessions';
function App() {
    return (
    <UserProvider>
     <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route  path='/sign-up' element={<SignUp/>}/>
      <Route  path='/login' element={<LoginPage/>}/>
      <Route  path='/user-dashboard' element={<Dashboard/>}/>
      <Route  path='/tutor-dashboard' element={<TutorDashboard/>}/>
      <Route path='/tutor-application' element={<TutorApplicationForm/>}/>
      <Route path='/tutor/:id' element={<Tutor/>}/>
      <Route path='/tutors' element={<AllTutors/>}/>
      <Route  path='/admin-Dashboard' element={<AdminDashboard/>}/>
      <Route path="/user-sessions" element={<Sessions/>}/>
      <Route path="/tutor-sessions" element={<TutorSessions/>}/>
    </Routes> 
    </UserProvider>
  )
}

export default App
