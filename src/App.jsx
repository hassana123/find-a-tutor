import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

import TutorApplicationForm from './pages/TutorApplicationForm';
import Tutor from './pages/Tutor';
import AllTutors from './pages/AllTutors';
import { UserProvider } from './UserContext';
import Sessions from './pages/Sessions';
import TutorSessions from './pages/tutorDashboard/TutorSessions';
import Manageprofile from './pages/tutorDashboard/Manageprofile';
import EditProfile from './pages/EditProfile';
import Inbox from './pages/Inbox';
import Users from './pages/admin/Users';
import AdminDashboard from './pages/admin/AdminDashboard';
import { ChatContextProvider } from './ChatContext';
import Applications from './pages/admin/Application';
function App() {
    return (
    <UserProvider>
     <ChatContextProvider>
     <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route  path='/sign-up' element={<SignUp/>}/>
      <Route  path='/login' element={<LoginPage/>}/>
      <Route  path='/user-dashboard' element={<Dashboard/>}/>
     
      <Route path='/tutor-application' element={<TutorApplicationForm/>}/>
      <Route path='/tutor/:id' element={<Tutor/>}/>
      <Route path='/tutors' element={<AllTutors/>}/>
      
      <Route path="/user-sessions" element={<Sessions/>}/>
      <Route path="/tutor-sessions" element={<TutorSessions/>}/>
      <Route path="/manage-profile" element={<Manageprofile/>}/>
      <Route path="/edit-profile" element={<EditProfile/>}/>
      <Route path="/inbox" element={<Inbox/>}/>

      {/** ADMIN Routes */}
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/admin/users" element={<Users/>}/>
      <Route path="/admin/applications" element={<Applications/>}/>
      <Route path="/admin/tutors" element={<Applications/>}/>
    </Routes>
      </ChatContextProvider> 
    </UserProvider>
  )
}

export default App
