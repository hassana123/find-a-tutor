import React, { createContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const userId = JSON.parse(localStorage.getItem("userTutorly"))?.uid || JSON.parse(sessionStorage.getItem("userTutorly"))?.uid;
 console.log(JSON.parse(sessionStorage.getItem("userTutorly"))?.uid);
  useEffect(() => {
   
    const fetchUserData = async () => {
     
      if (userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUser({ ...userDoc.data(), id: userDoc.id });
          setLoading(false);
        }
      }else{
        setLoading(false);
      }
     
    };

    fetchUserData();
  }, [user]);
   console.log(user);

  return (
    <UserContext.Provider value={user}>
      {loading  || user !=null? (
      
        <p className='text-center text-[25px] my-5'>Loading...</p>
      ) : (
        children 
      )}
    </UserContext.Provider>
  );
};
