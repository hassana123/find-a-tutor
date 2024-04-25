import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import requireAuth from '../requireAuth';
import { collection, doc, getDoc, addDoc, updateDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from "../UserContext";
import {BiMessage} from "react-icons/bi";
import { ChatContext } from '../ChatContext';

const Tutor = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const { dispatch } = useContext(ChatContext);
  const [sending, setSending] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const tutorRef = doc(db, 'tutors', id);
        const tutorDoc = await getDoc(tutorRef);
        if (tutorDoc.exists()) {
          setTutor( {id: tutorDoc.id,
            ...tutorDoc.data()});
setLoading(false);
        } else {
          setError('Tutor not found');
setLoading(false):
        }
      } catch (error) {
        setError('Error fetching tutor details');
        console.error('Error fetching tutor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id, navigate]);

  const {user} = useContext(UserContext);
  const userId = user.id;
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);

      // Create session document in user's collection
      const userSessionRef = await addDoc(collection(db, `users/${userId}/sessions`), {
        tutorId: id,
        tutorName: tutor.name,
        tutorEmail: tutor.email,
        requestMessage: requestMessage,
        date: selectedDate,
        time: selectedTime,
        course: selectedCourse,
        status: 'pending'
      });

      const tutorSessionRef = doc(db, `tutors/${id}/sessions`, userSessionRef.id);
    await setDoc(tutorSessionRef, {
      tuteeId: userId,
      tutee: user.name,
      tuteeEmail: user.email,
      requestMessage: requestMessage,
      date: selectedDate,
      time: selectedTime,
      course: selectedCourse,
      status: 'pending'
    });


      console.log('Session created successfully:', userSessionRef.id, tutorSessionRef.id);
      // Reset form fields after successful submission
      setSending(false);
      setRequestMessage('');
      setSelectedDate('');
      setSelectedTime('');
      setSelectedCourse('');
    } catch (error) {
      console.error('Error creating session:', error);
      // Handle error
      setSending(false);
      setError('Error creating session. Please try again.');
    }
  };
  const handleSelect = async (selectedUser) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user.id > selectedUser.id
        ?user.id + selectedUser.id
        : selectedUser.id + user.id;
        console.log(combinedId)
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await setDoc(doc(db, `/users/${user.id}/userChats`, user.id),{
          "userInfo": {
              id: selectedUser.id,
              name: selectedUser.name,
              photoURL: selectedUser.profilePicture? selectedUser.profilePicture:"",
              date: serverTimestamp(),
              combinedId,
            },
          
          });
          console.log("done");
        await setDoc(doc(db, `/users/${selectedUser.id}/userChats`, selectedUser.id),{
          "userInfo": {
              id: user.id,
              name: user.name,
              photoURL:user.profilePicture ? user.profilePicture: "",
              date: serverTimestamp(),
              combinedId,
            },
           
          });
          console.log("done");
          dispatch({ type: "CHANGE_USER", payload: selectedUser });
      }
      else{
        await updateDoc(doc(db, `/users/${selectedUser.id}/userChats`, selectedUser.id), {
            "userInfo": {
              id: user.id,
              name: user.name,
              photoURL:user.profilePicture ? user.profilePicture: "",
              date: serverTimestamp(),
              combinedId,
            },
           
          });
          await updateDoc(doc(db, `/users/${user.id}/userChats`, user.id), {
              "userInfo": {
                id: selectedUser.id,
                name: selectedUser.name,
                photoURL: selectedUser.profilePicture? selectedUser.profilePicture:"",
                date: serverTimestamp(),
                combinedId,
              },
            
            });
            dispatch({ type: "CHANGE_USER", payload: selectedUser });
      }
    } catch (err) {
        console.log(err);
    }

   
   
  };
  const handleChatWithTutor = (selectedTutor) => {
    handleSelect(selectedTutor)
    navigate(`/inbox`);
    // Trigger handleSelect function to open chat with selected tutor
    dispatch({ type: "CHANGE_USER", payload: selectedTutor});
  };
  console.log(tutor);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <DashboardLayout>
      <div className="mx-1">
        <h1 className="text-2xl font-semibold mb-5">Tutor Details</h1>
        {tutor ? (
          <>
          <div className="bg-white shadow-md  py-5 gap-2 grid md:grid-cols-2 rounded-md">
            <div className='mx-2'>
              <img src={tutor.image || ""} alt="Tutor" className="rounded-md mb-4" />
              <h2 className="text-xl font-semibold mb-2">{tutor.name}</h2>
              <p className="text-gray-600 mb-2">{tutor.department}</p>
              <p className="text-gray-600 mb-4">Availability: {tutor.availability}</p>
              <h3 className="text-lg font-semibold mb-2">Courses</h3>
              <ul className="list-disc pl-5 mb-4">
                {tutor.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
              <button onClick={()=>handleChatWithTutor(tutor)} className='mt-10 bg-red-600 text-white  px-10 py-3 rounded-md flex items-center gap-2 hover:bg-red-400 '>chat with tutor<BiMessage/></button>
            </div>
            <div className='text-[16px] space-y-3'>
              <h1 className='font-bold text-[20px]'>Bio</h1>
              <p>{tutor.bio}</p>
              <h1 className='font-bold text-[20px]'>Experience</h1>
              <p >{tutor.experience}</p>
              <h1 className='font-bold text-[20px]'>Additional Info</h1>
              <p >{tutor.additionalInfo}</p>
             {/* <p>{tutor.id}</p> */}
          </div>
            
          </div>
          <form className='my-5 mx-6 w-[80%]' onSubmit={handleRequestSubmit}>
          <h2 className="text-xl font-semibold mb-3">Request Session</h2>
          <div className="mb-4">
            <label htmlFor="requestMessage" className="block mb-1 font-semibold">Request Message <small>(i.e intruduce yourself)</small></label>
            <textarea
              id="requestMessage"
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="Type your request message..."
              className="w-full p-2 border rounded-md"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="selectedCourse" className="block mb-1 font-semibold">Select Course <small>(course you need help with)</small></label>
            <select
              id="selectedCourse"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Course</option>
              {tutor.courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="selectedDate" className="block mb-1 font-semibold">Date <small>(Day you want the tutorial to hold)</small></label>
            <input
              id="selectedDate"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="selectedTime" className="block mb-1 font-semibold">Time <small>(preffered time for the Tutorial)</small></label>
            <input
              id="selectedTime"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">{sending ? "Sending Request...." : "Send Request"}</button>
        </form>
          </>
        ) : (
          <p>No tutor found with ID: {id}</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default requireAuth(Tutor);
