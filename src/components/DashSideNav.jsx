import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BiEdit, BiTrash, BiUserCircle } from 'react-icons/bi';
import { RiLogoutCircleLine, RiHome4Line, RiGroup2Line, RiTimer2Line, RiInbox2Line, RiStarLine } from "react-icons/ri";
import star from "../assets/Star.svg";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from "../../firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore"
import { collection, query, getDocs } from "firebase/firestore";
import { ChatContext } from '../ChatContext';

const DashSideNav = ({ show }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const user = useContext(UserContext);
  const { data } = useContext(ChatContext);

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('userTutorly');
    sessionStorage.removeItem('userTutorly');
  };

  const handleDeleteAccount = async () => {
    try {
      const userAuth = auth.currentUser;

      if (userAuth) {
        await userAuth.delete();
        await deleteDoc(doc(db, 'users', user.id));
        await deleteDoc(doc(db, 'tutors', user.id));
        navigate('/');
      } else {
        console.error('No user found');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      try {
        const unreadMessagesRef = doc(db, "unreadMessages", user.id);
        const unreadMessagesDoc = await getDoc(unreadMessagesRef);

        if (unreadMessagesDoc.exists()) {
          let count = 0;
          unreadMessagesDoc.data().messages.forEach((message) => {
            count++;
          });
          setUnreadCount(count);
        } else {
          setUnreadCount(0);
        }
      } catch (error) {
        console.error("Error fetching unread messages count:", error);
      }
    };

    fetchUnreadMessagesCount();
  }, [user.id]);

  const renderUnreadBadge = () => {
    if (unreadCount > 0) {
      return (
        <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center absolute -top-1 -right-1 text-white text-xs">
          {unreadCount}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {deleteAccount ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="w-[80%] bg-white shadow-md py-10 px-5 rounded-lg text-center">
            <h1 className="text-2xl font-bold mb-6">Are you sure you want to delete your account?</h1>
            <button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mr-4 rounded">
              Yes DELETE
            </button>
            <button onClick={() => setDeleteAccount(false)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
              No CANCEL
            </button>
          </div>
        </div>
      ) : null}

      {/**desktop nav */}
      <nav className='bg-white py-10 w-[25%] md:block hidden'>
        <div className='flex justify-between items-center mx-5'>
          <div className='flex gap-3 itemscenter'>
            <img className='p-1 rounded-[50%] bg-[#F13E3E]' src={star} alt="" />
            <h1 className='text-[18px] shadow-sm  text-[#F13E3E] font-bold'>Tutorly</h1>
          </div>
          <IoEllipsisVertical onClick={() => setOpen(!open)} className='cursor-pointer hover:text-[#F13E3E]' />
        </div>
        {open ? (
          <div className='absolute bg-white shadow-lg  lg:left-[6%] py-5 px-3'>
            <h1 className='font-semibold text-[14px] mt-10 mb-3'> {user?.isTutor ? "" : "Become A Tutor"}</h1>
            {user?.isTutor ? (
              <></>
            ) : (
              <NavLink to="/tutor-application" className="flex hover:text-red-600 gap-2 items-center" >Apply to become a Tutor </NavLink>
            )}
            <button onClick={handleLogout} className=" my-5 hover:text-red-600 flex gap-2 items-center"><RiLogoutCircleLine />Logout</button>
            {user?.isTutor ? <NavLink style={({ isActive }) => {
              return isActive ? { color: "#F13E3E" } : {}
            }} className="my-5 hover:text-red-600 flex gap-2 items-center" to="/manage-profile"><BiEdit /> Edit Profile</NavLink> : <NavLink style={({ isActive }) => {
              return isActive ? { color: "#F13E3E" } : {}
            }} className="my-5 hover:text-red-600 flex gap-2 items-center" to="/edit-profile"><BiEdit /> Edit Profile</NavLink>}
          </div>
        ) : (
          <></>
        )}
        <div className='mx-5'>
          <h1 className='font-bold text-[18px] my-10'>OVERVIEW</h1>

          <div className='space-y-5 text-[16px] font-semibold'>
            <NavLink style={({ isActive }) => {
              return isActive ? { color: "#F13E3E" } : {}
            }} to="/user-dashboard" className="flex hover:text-red-600 gap-2 items-center"> <RiHome4Line /> Dashboard</NavLink>
            <NavLink style={({ isActive }) => {
              return isActive ? { color: "#F13E3E" } : {}
            }} to="/tutors" className="flex gap-2 hover:text-red-600 items-center">  <RiGroup2Line /> Tutors</NavLink>
            {user?.isTutor ? <>
              <NavLink style={({ isActive }) => {
                return isActive ? { color: "#F13E3E" } : {}
              }} to="/tutor-sessions" className="flex  hover:text-red-600 gap-2 items-center"> <RiTimer2Line /> Bookings</NavLink>
              <NavLink style={({ isActive }) => {
                return isActive ? { color: "#F13E3E" } : {}
              }} to="/user-sessions" className="flex  hover:text-red-600 gap-2 items-center"> <RiTimer2Line /> Scheduled Sessions</NavLink>
            </>
              : <NavLink style={({ isActive }) => {
                return isActive ? { color: "#F13E3E" } : {}
              }} to="/user-sessions" className="flex  hover:text-red-600 gap-2 items-center"> <RiTimer2Line /> Scheduled Sessions</NavLink>}
            <NavLink style={({ isActive }) => {
              return isActive ? { color: "#F13E3E" } : {}
            }} to="/inbox" className="flex  hover:text-red-600 gap-2 items-center"><RiInbox2Line />  Inbox {location.pathname === '/inbox' ? null : renderUnreadBadge()}</NavLink>
            <NavLink style={({ isActive }) => {
              return isActive ? { color: "#F13E3E" } : {}
            }} to="/user-reviews" className="flex  hover:text-red-600 gap-2 items-center">  <RiStarLine />  Reviews</NavLink>
          </div>
        </div>
        <div className='my-10 w-[90%] shadow-md mx-auto text-center'>
          {user?.profilePicture ? <img src={user.profilePicture} className='mx-auto my-5 rounded-[50%] w-[150px] h-[150px]' alt="profilePicture" /> : <BiUserCircle size={100} className='mx-auto my-5' />}
          <h1 className='font-bold text-[18px] mb-1'>{getGreetingMessage()} {user?.username ? `${user?.username}` : `${user?.name}`}</h1>
          <p className='text-[12px] mb-5'>{user?.bio ? `${user?.bio}` : "continue your journey and achieve Your Target"} </p>
          <div className='flex justify-center gap-5'>
            <button onClick={handleLogout} className="border hover:text-[#F13E3E]  p-3 rounded-[50%]"  ><FiLogOut /></button>
            {user?.isTutor ? <NavLink style={({ isActive }) => {
              return isActive ? { color: "#F13E3E" } : {}
            }} className="border p-3 rounded-[50%] hover:text-[#F13E3E]" to="/manage-profile"><BiEdit /></NavLink> : <NavLink style={({ isActive }) => {
              return isActive ? { color: "#F13E3E" } : {}
            }} className="border p-3 rounded-[50%]" to="/edit-profile"><BiEdit /></NavLink>}
            <button className="border hover:text-[#F13E3E] p-3 rounded-[50%]" onClick={() => setDeleteAccount(true)} ><BiTrash /></button>
          </div>
        </div>
        <div className='mx-5 space-y-5'>
          <NavLink style={({ isActive }) => {
            return isActive ? { color: "#F13E3E" } : {}
          }} to="settings" className=" hover:text-red-600 flex gap-2 items-center"><FiSettings /> Settings</NavLink>
          <NavLink style={({ isActive }) => {
            return isActive ? { color: "#F13E3E" } : {}
          }} to="logout" className=" hover:text-red-600 flex gap-2 items-center"><RiLogoutCircleLine />Logout</NavLink>
        </div>
      </nav>
      {/**mobile Nav */}
      <>
        {show ? (
          <nav className='bg-white shadow-md py-10 w-[65%] top-0 absolute md:hidden block'>
            <div className='flex justify-between items-center mx-5'>
              <div className='flex gap-3 itemscenter'>
                <img className='p-1 rounded-[50%] bg-[#F13E3E]' src={star} alt="" />
                <h1 className='text-[18px] shadow-sm  text-[#F13E3E] font-bold'>Tutorly</h1>
              </div>
            </div>
            <div className='mx-5'>
              <h1 className='font-bold text-[18px] my-10'>OVERVIEW</h1>
              <div className='space-y-5 text-[16px] font-semibold'>
                <NavLink style={({ isActive }) => {
                  return isActive ? { color: "#F13E3E" } : {}
                }} to="/user-dashboard" className="flex hover:text-red-600 gap-2 items-center"> <RiHome4Line /> Dashboard</NavLink>
                <NavLink style={({ isActive }) => {
                  return isActive ? { color: "#F13E3E" } : {}
                }} to="/tutors" className="flex gap-2 hover:text-red-600 items-center">  <RiGroup2Line /> Tutors</NavLink>
                {user?.isTutor ? <>
                  <NavLink style={({ isActive }) => {
                    return isActive ? { color: "#F13E3E" } : {}
                  }} to="/tutor-sessions" className="flex  hover:text-red-600 gap-2 items-center"> <RiTimer2Line /> Bookings</NavLink>
                  <NavLink style={({ isActive }) => {
                    return isActive ? { color: "#F13E3E" } : {}
                  }} to="/user-sessions" className="flex  hover:text-red-600 gap-2 items-center"> <RiTimer2Line /> Scheduled Sessions</NavLink>
                </>
                  : <NavLink style={({ isActive }) => {
                    return isActive ? { color: "#F13E3E" } : {}
                  }} to="/user-sessions" className="flex  hover:text-red-600 gap-2 items-center"> <RiTimer2Line /> Scheduled Session</NavLink>}
                <NavLink style={({ isActive }) => {
                  return isActive ? { color: "#F13E3E" } : {}
                }} to="/inbox" className="flex  hover:text-red-600 gap-2 items-center"><RiInbox2Line />  Inbox {location.pathname === '/inbox' ? null : renderUnreadBadge()}</NavLink>
                <NavLink style={({ isActive }) => {
                  return isActive ? { color: "#F13E3E" } : {}
                }} to="/user-reviews" className="flex  hover:text-red-600 gap-2 items-center">  <RiStarLine />  Reviews</NavLink>
              </div>
            </div>
            <div className='my-10 w-[90%] shadow-md mx-auto text-center'>
              {user?.profilePicture ? <img src={user.profilePicture} className='mx-auto my-5 rounded-[50%] w-[150px] h-[150px]' alt="profilePicture" /> : <BiUserCircle size={100} className='mx-auto my-5' />}
              <h1 className='font-bold text-[18px] mb-1'>{getGreetingMessage()}  {user?.username ? `${user?.username}` : `${user?.name}`}</h1>
              <p className='text-[12px] mb-5'>{user?.bio ? `${user?.bio}` : "continue your journey and achieve Your Target"} </p>
              <div className='flex justify-center gap-5'>
                <button onClick={handleLogout} className="border p-3  hover:text-[#F13E3E]  rounded-[50%]"  ><FiLogOut /></button>
                {user?.isTutor ? <NavLink style={({ isActive }) => {
                  return isActive ? { color: "#F13E3E" } : {}
                }} className="border p-3 rounded-[50%] hover:text-[#F13E3E]" to="/manage-profile"><BiEdit /></NavLink> : <NavLink style={({ isActive }) => {
                  return isActive ? { color: "#F13E3E" } : {}
                }} className="border p-3 rounded-[50%]" to="/edit-profile"><BiEdit /></NavLink>}
                <button className="border hover:text-[#F13E3E] p-3 rounded-[50%]" onClick={() => setDeleteAccount(true)} ><BiTrash /></button>
              </div>
            </div>
            <div className='mx-5 space-y-5'>
              <NavLink style={({ isActive }) => {
                return isActive ? { color: "#F13E3E" } : {}
              }} to="settings" className=" hover:text-red-600 flex gap-2 items-center"><FiSettings /> Settings</NavLink>
              <NavLink style={({ isActive }) => {
                return isActive ? { color: "#F13E3E" } : {}
              }} to="logout" className=" hover:text-red-600 flex gap-2 items-center"><RiLogoutCircleLine />Logout</NavLink>
            </div>
          </nav>

        ) : (
          <></>
        )}
      </>
    </>
  )
}

export default DashSideNav;
