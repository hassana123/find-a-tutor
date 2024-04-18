import React from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import DashboardLayout from "../components/DashboardLayout";
import {useNavigate} from "react-router-dom"
const Logout = () => {
    const navigate = useNavigate()
  // Add logout functionality
  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem('userTutorly');
    sessionStorage.removeItem('userTutorly');
    navigate('/');
  };
  return (
    <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
      <button
        className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-md"
        onClick={handleLogout}
      >
        <RiLogoutCircleLine />
        <span>Logout</span>
      </button>
    </div>
    </DashboardLayout>
  );
}

export default Logout;
