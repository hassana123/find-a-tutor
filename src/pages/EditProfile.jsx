import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { UserContext } from '../UserContext';
import { setSuccess, setError, clearError, clearSuccess, setLoading } from '../authComponents/authSlice';
import DashboardLayout from "../components/DashboardLayout";
import requireAuth from '../requireAuth';


const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useContext(UserContext);

  const [fullName, setFullName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
 // const [email, setEmail] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio);
  const [displayPicture, setDisplayPicture] = useState(null);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearError());
    }, 3000);

    return () => clearTimeout(timeout); 
  }, [error, dispatch]);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     dispatch(clearSuccess());
  //   }, 1000);

  //   return () => clearTimeout(timeout); 
  // }, [success, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDisplayPicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      // Update user profile details
      await updateDoc(doc(db, 'users', user.id), {
        name: fullName,
        username: username,
        bio: bio,
        // Add more fields as needed
      });

      // Upload display picture to Firebase storage
      if (displayPicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}/${displayPicture.name}` );
        await uploadBytes(storageRef, displayPicture);
        const imageUrl = await getDownloadURL(storageRef);

        // Update user profile with display picture URL
        await updateDoc(doc(db, 'users', user.id), {
          profilePicture: imageUrl,
        });
        if(user.isTutor){
          await updateDoc(doc(db, 'tutors', user.id), {
            name: fullName,
            username: username,
            bio: bio,
           
          });
        }
      }

      dispatch(setSuccess('Profile updated successfully'));
    } catch (error) {
      console.error('Error updating profile:', error);
      dispatch(setError('Error updating profile. Please try again later.'));
    }

    dispatch(setLoading(false));
  };

  return (
    <DashboardLayout>
      <p  className='text-red-500 text-[20px] text-center my-5'>{error}</p>
      <p className='text-green-500 text-[20px] text-center my-5' >{success}</p>
      <section className="max-w-lg  my-10 bg-white shadow-md py-10 rounded-md px-8 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"></textarea>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Display Picture</label>
            <input type="file" onChange={handleFileChange} accept="image/*" className="w-full border border-gray-300 rounded-md focus:outline-none" />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">{loading? "saving":"Save Changes"}</button>
        </form>
      </section>
    </DashboardLayout>
  );
};

export default requireAuth(EditProfile);
