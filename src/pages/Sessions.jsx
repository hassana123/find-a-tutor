import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import {  BiFilterAlt,  } from 'react-icons/bi';
import { FiClock, FiCalendar, FiTrash, FiXCircle} from "react-icons/fi";
import { UserContext } from "../UserContext";
import CountdownTimer from '../components/CountDownTimer';
import requireAuth from '../requireAuth';
import emailjs from "@emailjs/browser";
import FeedbackPrompt from '../components/FeedbackPrompt';
const SessionConfirmationDialog = ({ onClose, onConfirm }) => {
  return (
    <div className="session-confirmation-dialog">
      <h2>Did the session take place?</h2>
      <button onClick={() => onConfirm(true)}>Yes</button>
      <button onClick={() => onConfirm(false)}>No</button>
    </div>
  );
};

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [sessionHeld, setSessionHeld] = useState(null);
  const [showFeedbackPrompt, setShowFeedbackPrompt] = useState(false);

  const [filter, setFilter] = useState("all"); // Default filter option
  const user = useContext(UserContext);
  const userId = user?.id;

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `users/${userId}/sessions`));
        const sessionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //console.log(sessionsData)
        setSessions(sessionsData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching sessions');
        console.error('Error fetching sessions:', error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);
  const handleConfirmation = (sessionHeld) => {
    setSessionHeld(sessionHeld);
    setShowConfirmationDialog(false);
    // If the session didn't hold, show the feedback prompt
    if (!sessionHeld) {
      setShowFeedbackPrompt(true);
    }
  };
  const handleFeedbackPrompt = async (sessionId, scheduledDateTime) => {
    try {
        // Check if the prompt has been shown for this session
        const promptShownKey = `session_${sessionId}_feedback_prompt_shown`;
        const promptShown = localStorage.getItem(promptShownKey);

        if (!promptShown) {
            const sessionDateTime = new Date(scheduledDateTime);
            const currentTime = new Date();
            const timeDifference = sessionDateTime.getTime() - currentTime.getTime();

            // Check if the session has passed and it's at least 2 hours after the scheduled time
            if (timeDifference <= 0) {
                // Prompt for feedback
                setShowConfirmationDialog(true);
                // if (feedback) {
                //     // Open rating component
                // } else {
                //     // Prompt for feedback on why the session didn't take place
                // }

                // Set the promptShown flag in local storage to prevent showing the prompt again
                localStorage.setItem(promptShownKey, "true");
            }
        }
    } catch (error) {
        console.error("Error handling feedback prompt:", error);
    }
};

  useEffect(() => {
    sessions.forEach(session => {
      const sessionDateTime = new Date(`${session.date}T${session.time}`);
      const currentDate = new Date();
      const timeDifference = sessionDateTime.getTime() - currentDate.getTime();

      // Handle feedback prompt two hours after scheduled time
      if (timeDifference > 0 && timeDifference <= 2 * 60 * 60 * 1000) {
        handleFeedbackPrompt(session.id, sessionDateTime);
      }
    });
  }, [sessions]);
  
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

  const handleDelete = async (sessionId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/sessions`, sessionId));
      setSessions(sessions.filter(session => session.id !== sessionId));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };
  const sendSessionCancellationNotification = async (templateParams) => {
    try {
      emailjs.init("fMDmIeULGLnsvqA7f");
    emailjs.send("service_co0qdum","template_fmcumye", templateParams)
     console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  const handleCancel = async (sessionId, tutorId) => {
    try {
      await updateDoc(doc(db, `users/${userId}/sessions`, sessionId), { status: 'canceled' });
      await updateDoc(doc(db, `tutors/${tutorId}/sessions`, sessionId), { status: 'canceled' });
      console.log("done");
      const session = sessions.find(session => session.id === sessionId);
      const templateParams = {
        to_email: session.tutorEmail, 
        subject: 'New Session Request',
        message: `Hello ${session.tutorName},\n\nYou have received a new session request from a student. Please log in to your account to view the details.\n\nBest regards,\nThe Tutorly Team`,
      };
      sendSessionCancellationNotification(templateParams);
    setSessions(sessions.map(session => session.id === sessionId ? { ...session, status: 'canceled' } : session));
    
  } catch (error) {
    console.error('Error rejecting session:', error);
  }
    console.log('Cancel session:', sessionId);
  };
  
 
  // let gapi = window.gapi
  // const CLIENT_ID ="429285555541-ij2ckgtc0up7j48qhqj1i3f378hsag47.apps.googleusercontent.com"
  // const API_KEY = "AIzaSyB7MNcEaDwxIHJY_HOMu7Mul8Dtk8EOKpQ"
  // const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  // const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
  // const handleSetReminder = async (session) => {
  // const startDateTime = new Date(`${session.date}T${session.time}`);
  // const endDateTime = new Date(startDateTime);
  // endDateTime.setDate(startDateTime.getDate() + 1); // Add 1 day
  // const endDateTimeString = endDateTime.toISOString();
  //   gapi.load('client:auth2', ()=>{
  //     console.log("done");
  //     gapi.client.init({
  //       apiKey:API_KEY,
  //       clientId:CLIENT_ID,
  //       discoveryDocs:DISCOVERY_DOC,
  //       scope:SCOPES,
  //     })
  //     gapi.client.load("calendar", "v3", ()=>{
  //       console.log("done");
  //     })
  //     gapi.auth2.getAuthInstance().signIn()
  //     .then(()=>{
  //       const event = {
  //         summary: `Session with ${session.tutorName}`, // Event summary
  //         description: `peer tutor session with ${session.tutorName} to master ${session.course}`, // Event description
  //         start: {
  //           dateTime: startDateTime.toISOString(), // Event start datetime
  //           timeZone: 'Africa/Lagos', // Nigerian time zone
  //         },
  //         end: {
  //           dateTime: endDateTimeString, // Event end datetime
  //           timeZone: 'Africa/Lagos', // Nigerian time zone
  //         },
  //         recurrence:[
  //           "RRULE:FREQ=DAILY;COUNT=2"
  //         ],
  //         reminders:{
  //           useDefault:false,
  //          overrides:[
  //           {method:"popup:", minutes:10}
  //          ]
  //         }
  //       };
  //       const request = gapi.client.calendar.events.insert({
  //         calendarId:"primary",
  //         resource:event,
  //       })
  //       request.execute(event=>{
  //         window.open(event.htmlLink)
  //       })
  //     })
  //   })
  //   console.log('Set reminder for session:', session);
  // };

  if (loading) {
    return <p className="text-center mt-8 text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  }
  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    // Hide the feedback prompt
    setShowFeedbackPrompt(false);
  };
  const renderFeedbackPrompt = () => {
    if (showFeedbackPrompt && !sessionHeld) {
      return <FeedbackPrompt onFeedbackSubmit={handleFeedbackSubmit} />;
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div>
    
      {renderFeedbackPrompt()}
    </div>
       {showConfirmationDialog && (
        <SessionConfirmationDialog
          onClose={() => setShowConfirmationDialog(false)}
          onConfirm={handleConfirmation}
        />
      )}
      <div className="mx-5">
        <h1 className="text-3xl font-semibold mb-5">Sessions</h1>
        <div className="mb-5 flex gap-2">
          <label htmlFor="filter" className="mr-2 font-semibold flex items-center my-3">Filter <BiFilterAlt  color='#F13E3E' size={30}/></label>
          <select id="filter" value={filter} onChange={(e) => handleFilterChange(e.target.value)} className="border rounded-md p-2">
          <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="canceled">Canceled</option>
            <option value="all">All</option>
          </select>
        </div>
        <div className="grid gap-5  md:grid-cols-2">
          {filteredSessions.map(session => (
            <div key={session.id} className="bg-white shadow-md rounded-md ">
              <div className="px-3 py-5 text-[14px] font-semibold rounded-md">
                <p className="text-gray-600 mb-2">Tutor Name: {session.tutorName}</p>
                <p className="text-gray-600 mb-2">Request Message: {session.requestMessage}</p>

                <div className='flex gap-3'>
                  <p className="text-gray-600 flex gap-2 items-center mb-2"><FiCalendar /> {session.date}</p>
                  <p className="text-gray-600 mb-2 flex gap-2 items-center mb"><FiClock /> {session.time}</p>
                </div>
                <p className="text-gray-600 mb-2">Course: {session.course}</p>
                
                {/* Render buttons based on session status */}
                {session.status === 'accepted' && (
  <div>
    <CountdownTimer scheduledDateTime={`${session.date}T${session.time}`} />
    <button onClick={() => handleSetReminder(session)} className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center gap-2">
      Add to Calendar
    </button>
  </div>
)}

                {/* Cancel and delete buttons */}
                <div className='flex justify-between my-3'>
                <p className="text-gray-600 ">Status: {session.status}</p>
                <div className="flex justify-end ">
                 {session.status!=="rejected"? <button onClick={() => handleCancel(session.id, session.tutorId)} className="text-red-500 flex items-center gap-2">
                    <FiXCircle /> Cancel
                  </button>:""}
                {session.status==="rejected"?  <button onClick={() => handleDelete(session.id)} className="text-red-500 flex items-center gap-2">
                    <FiTrash /> Delete
                  </button>:""}
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

export default requireAuth(Sessions);
