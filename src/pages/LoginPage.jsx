import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import group from "../assets/Group4.png";
import { auth, db } from '../../firebase';
import {  getDoc, doc } from 'firebase/firestore';
import { clearSuccess,setLoading, setUser, setSuccess, clearError, setError } from '../authComponents/authSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);
  //const isTutor = useSelector((state) => state.auth.isTutor);

  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearError());
    }, 3000);

    return () => clearTimeout(timeout); 
  }, [error, dispatch]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearSuccess());
    }, 3000);

    return () => clearTimeout(timeout); 
  }, [success, dispatch]);

  const handleLogin = async () => {
    // Simple validation
    if (!email || !password) {
      dispatch(setError('Please fill in all fields'));
      return;
    }
  try {
      dispatch(setLoading(true));
      // Call Firebase signInWithEmailAndPassword method
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // If successful, update user state in Redux
      const userCred = userCredential.user;
      console.log(userCred);
      if (!userCred?.emailVerified) {
        dispatch(setError('Please verify your email to login.'));
        return;
      }
      if (rememberMe) {
        localStorage.setItem('userTutorly', JSON.stringify(userCredential.user));
      } else {
        sessionStorage.setItem('userTutorly', JSON.stringify(userCredential.user));
        localStorage.removeItem('userTutorly');
      }
      const userDocRef = doc(db, "users", userCred.uid);
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists) {
        const userData = userDoc.data();
        dispatch(setUser(userData));
        if (userData.isTutor) {
          navigate("/tutor-dashboard");
          return;
        } else {
          navigate("/user-dashboard");
        }
      }
      dispatch(setUser(userCred.uid));
      dispatch(setSuccess("Login Sucessfull"));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
 
  return (
    <section className='bg-[#CF3D4B] my-10 w-[98%] md:w-[70%] lg:w-[55%]  mx-auto flex'>
      <div className='bg-[#CF3D4B] hidden md:block w-[40%] inline-block'>
        <img src={group} alt="" />
      </div>
      <div className='bg-white w-[100%] md:w-[60%] rounded-tl-lg rounded-bl-lg shadow-md  py-10'>
        <div className='flex justify-between mx-5 my-10 text-[20px] font-bold text-center'>
          <NavLink to="/sign-up" className={({isActive}) => isActive ? "border-b-[3px] rounded-sm px-10 py-1 text-[#CF3D4B] border-[#CF3D4B]" : "border-b-[3px] rounded-sm px-10 py-1 text-[#7D7D7D] border-[#7D7D7D]"}>Sign Up</NavLink>
          <NavLink to="/login" className={({isActive}) => isActive ? "border-b-[3px] rounded-sm px-10 py-1 text-[#CF3D4B] border-[#CF3D4B]" : "border-b-[3px] rounded-sm px-10 py-1 text-[#7D7D7D] border-[#7D7D7D]"}>Login</NavLink>
        </div>
        <form onSubmit={handleLogin} className='text-[#33333] mx-5'>
          <input className='block w-[100%] border-b border-[#7D7D7D] rounded-md my-5 bg-white shadow-lg px-3 py-4' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className='block w-[100%] border-b border-[#7D7D7D] rounded-md my-5 bg-white shadow-lg px-3 py-4' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
          <div className='flex my-10 justify-between'>
            <input className='w-[10%]' type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <p className='text-[#7D7D7D]'>Remember Me</p>
          </div>
          <button type='button' className='block bg-[#cf3d4b] mx-auto w-[100%] rounded-md font-bold text-white py-[10px] my-5' onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <small className='block text-center text-[14px] text-[#7D7D7D]'>New Here? <NavLink className="text-[#cf3d4b]" to="/sign-up">Sign Up</NavLink></small>
      </div>
    </section>
  );
}

export default LoginPage;
