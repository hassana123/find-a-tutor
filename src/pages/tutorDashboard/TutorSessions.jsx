import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { FiClock, FiCalendar, FiTrash, FiCheckCircle, FiXCircle } from "react-icons/fi";
import requireAuth from '../../requireAuth';
import { UserContext } from "../../UserContext";
import {BiFilterAlt} from"react-icons/bi"
import emailjs from "@emailjs/browser";


const TutorSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("pending"); // Default filter option
  const user = useContext(UserContext);
  const tutorId = user?.id;

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `tutors/${tutorId}/sessions`));
        const sessionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSessions(sessionsData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching sessions');
        console.error('Error fetching sessions:', error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, [tutorId]);

  useEffect(() => {
    // Filter sessions based on the selected filter option
    if (filter === "all") {
      setFilteredSessions(sessions);
    } else {
      const filtered = sessions.filter(session => session.status === filter);
      setFilteredSessions(filtered);
    }
  }, [sessions, filter]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };
  const sendEmail = async (templateParams) => {
    try {
      emailjs.init("fMDmIeULGLnsvqA7f");
    emailjs.send("service_co0qdum","template_fmcumye", templateParams)
     console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  const handleAccept = async (sessionId, userId) => {
    try {
      await updateDoc(doc(db, `tutors/${tutorId}/sessions`, sessionId), { status: 'accepted' });
      await updateDoc(doc(db, `users/${userId}/sessions`, sessionId), { status: 'accepted' });
      console.log("done");

      // Send acceptance email to the user
      const session = sessions.find(session => session.id === sessionId);
      const templateParams = {
        to_email: session.tuteeEmail,
        subject: 'Session Request Accepted',
        message: `Dear ${session.tutee},\n\nYour session request has been accepted. Please log in to your account to view the details.\n\nBest regards,\nThe Tutorly Team`
      };
      await sendEmail(templateParams);

      setSessions(sessions.map(session => session.id === sessionId ? { ...session, status: 'accepted' } : session));
    } catch (error) {
      console.error('Error accepting session:', error);
    }
  };

  const handleReject = async (sessionId, userId) => {
    try {
      await updateDoc(doc(db, `tutors/${tutorId}/sessions`, sessionId), { status: 'rejected' });
      await updateDoc(doc(db, `users/${userId}/sessions`, sessionId), { status: 'rejected' });
      console.log("done");

      // Send rejection email to the user
      const session = sessions.find(session => session.id === sessionId);
      const templateParams = {
        to_email: session.email,
        subject: 'Session Request Rejected',
        message: `Dear ${session.tutee},\n\nWe regret to inform you that your session request has been rejected.\n\nBest regards,\nThe Tutorly Team`
      };
      await sendEmail(templateParams);

      setSessions(sessions.map(session => session.id === sessionId ? { ...session, status: 'rejected' } : session));
    } catch (error) {
      console.error('Error rejecting session:', error);
    }
  };
  const handleDelete = async (sessionId) => {
    try {
      await deleteDoc(doc(db, `tutors/${tutorId}/sessions`, sessionId));
      // Remove the session from the state
      setSessions(sessions.filter(session => session.id !== sessionId));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  if (loading) {
    return <p className="text-center mt-8 text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  }
console.log(sessions)
  return (
    <DashboardLayout>
      <div className="mx-5">
        <h1 className="text-3xl font-semibold mb-5">Your Sessions</h1>
        <div className="mb-5 flex gap-2">
          <label htmlFor="filter" className="mr-2 font-semibold flex items-center my-3">Filter <BiFilterAlt color='#F13E3E' size={30} /></label>
          <select id="filter" value={filter} onChange={(e) => handleFilterChange(e.target.value)} className="border rounded-md p-2">
            <option value="accepted">Accepted</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="canceled">Canceled</option>
            <option value="all">All</option>
          </select>
        </div>
        <div className="grid gap-5  md:grid-cols-2">
          {filteredSessions.map(session => (
            <div key={session.id} className="bg-white shadow-md rounded-md ">
              <div className="px-3 py-5 text-[14px] font-semibold rounded-md">
                <p className="text-gray-600 mb-2">User Name: {session.tutee}</p>
                <p className="text-gray-600 mb-2">Request Message: {session.requestMessage}</p>
                <div className='flex gap-3'>
                  <p className="text-gray-600 flex gap-2 items-center mb-2"><FiCalendar /> {session.date}</p>
                  <p className="text-gray-600 mb-2 flex gap-2 items-center mb"><FiClock /> {session.time}</p>
                </div>
                <p className="text-gray-600 mb-2">Course: {session.course}</p>
                <div className="flex justify-between my-3">
                  <p className="text-gray-600 ">Status: {session.status}</p>
                  <div className="flex gap-3">
                    {session.status === 'pending' && (
                      <>
                        <button onClick={() => handleAccept(session.id, session.tuteeId)} className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center gap-2">
                          <FiCheckCircle /> Accept
                        </button>
                        <button onClick={() => handleReject(session.id, session.tuteeId)} className="bg-red-600 flex items-center text-white rounded-md px-4 py-2 gap-2">
                          <FiXCircle /> Reject
                        </button>
                      </>
                    )}
                    {session.status === "rejected" || session.status === "canceled" ? <button onClick={() => handleDelete(session.id)} className="text-red-500 flex items-center gap-2">
                      <FiTrash /> Delete
                    </button> : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default requireAuth(TutorSessions, true);
