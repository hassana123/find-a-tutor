import React, { createContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const userId = JSON.parse(localStorage.getItem("userTutorly"))?.uid || JSON.parse(sessionStorage.getItem("userTutorly"))?.uid;
  useEffect(() => {
   
    const fetchUserData = async () => {
     
      if (userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUser({ ...userDoc.data(), id: userDoc.id });
        }
      }
      setLoading(false); // Update loading state once user data is fetched
    };

    fetchUserData();
  }, [user, userId]);
//  console.log(user);

  return (
    <UserContext.Provider value={user}>
      {!loading ? ( // Conditional rendering based on loading state
        children // Render children when loading is false
      ) : (
        <p className='text-center text-[15px] my-5'>Loading...</p> // Render loading indicator when loading is true
      )}
    </UserContext.Provider>
  );
};
