import React, { createContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetch user data based on the user ID (you can adjust this logic as needed)
      const userId = JSON.parse(localStorage.getItem("userTutorly"))?.uid || JSON.parse(sessionStorage.getItem("userTutorly"))?.uid;
      if (userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUser({ ...userDoc.data(), id: userDoc.id });
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
