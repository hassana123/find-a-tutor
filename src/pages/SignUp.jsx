import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import group from "../assets/Group4.png";
import { auth, db } from '../../firebase';
import google from "../assets/google.svg"
import {setDoc, doc } from 'firebase/firestore';
import {  sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth';
import { clearError, setSuccess, setUser, setLoading, setError } from '../authComponents/authSlice';
const SignUp = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.sucess);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearError());
    }, 3000);

    return () => clearTimeout(timeout); 
  }, [error, dispatch]);
  const handleSignUp = async () => {
     // useEffect to clear error after 3 seconds
  
    // Simple validation
    if (!fullName || !email || !password || !confirmPassword) {
      dispatch(setError('Please fill in all fields'));
      return;
    }
    if (password !== confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return;
    }
    if (!agreeTerms) {
      dispatch(setError('Please agree to the Terms of Service and Privacy Policy'));
      return;
    }
     try {
      dispatch(setLoading(true));
      // Call Firebase createUserWithEmailAndPassword method
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // If successful, store user details in Firestore
      const userCred = userCredential.user;
      const userDeets= {
        name:fullName,
        email:email,
        isTutor:false,
      }

      await setDoc(doc(db, "users", userCred.uid), userDeets)
          // Send verification email
          console.log("done", );
      await sendEmailVerification(userCred);
      // Update user state in Redux
      console.log("sent");
      //dispatch(setUser(userCred.uid));
      console.log(userCred);
      dispatch(setLoading(false));
      alert("A verification mail has been sent to your mail please click the link atteched to")
      dispatch(setSuccess("A verification mail has been sent to your mail please click the link atteched to"));
     window.location.href="https://mail.google.com"
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error)
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
  <>
  <Navbar/>
    <section className='bg-[#CF3D4B] my-10 w-[98%] md:w-[75%] lg:w-[65%]  mx-auto flex'>
      <div className='bg-[#CF3D4B] w-[40%]  hidden md:block inline-block'>
        <img src={group} alt="" />
      </div>
      <div className='bg-white w-[100%] md:w-[60%]e rounded-tl-lg rounded-bl-lg shadow-md py-10'>
        <div className='flex justify-between my-10 mx-5 text-[20px] font-bold text-center'>
          <NavLink to="/sign-up" className={({isActive}) => isActive ? "border-b-[3px] rounded-sm px-10 py-1 text-[#CF3D4B] border-[#CF3D4B]" : "border-b-[3px] rounded-sm px-10 py-1 text-[#7D7D7D] border-[#7D7D7D]"}>Sign Up</NavLink>
          <NavLink to="/login" className={({isActive}) => isActive ? "border-b-[3px] rounded-sm px-10 py-1 text-[#CF3D4B] border-[#CF3D4B]" : "border-b-[3px] rounded-sm px-10 py-1 text-[#7D7D7D] border-[#7D7D7D]"}>Login</NavLink>
        </div>
        {error && <p className='text-red-500 text-center text-[18px] font-bold'>{error}</p>}
        {success && <p className='text-green-500 text-center text-[18px] font-bold'>{success}</p>}

        <form className='text-[#33333] mx-5'>
          <input className='block w-[100%] outline-[#CF3D4B] border-b border-[#7D7D7D] rounded-md my-5 bg-white shadow-lg px-3 py-4' type="text" name="name" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input className='block w-[100%] outline-[#CF3D4B] border-b border-[#7D7D7D] rounded-md my-5 bg-white shadow-lg px-3 py-4' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className='block w-[100%] outline-[#CF3D4B] border-b border-[#7D7D7D] rounded-md my-5 bg-white shadow-lg px-3 py-4' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className='block w-[100%] outline-[#CF3D4B] border-b border-[#7D7D7D] rounded-md my-5 bg-white shadow-lg px-3 py-4' type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <div className='flex my-10 gap-5'>
            <input className='w-[10%]' type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
            <p className='text-[#7D7D7D] text-[14px]'>I have read and agreed to the Terms of Service and Privacy Policy</p>
          </div>
          <button type='button' className='block bg-[#cf3d4b] mx-auto w-[100%] rounded-md font-bold text-white py-[10px] my-5' onClick={handleSignUp} disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</button>
          <button type='button' className='block border-[2px] border-[#cf3d4b] mx-auto text-[#cf3d4b] w-[100%] rounded-md  py-[10px] my-5'><img className='inline w-[5%] mx-3' src={google} alt="" /> Signup with google</button>
        </form>
        <small className='block text-center text-[14px] text-[#7D7D7D]'>Already have an Account? <NavLink className="text-[#cf3d4b]" to="/login">Login</NavLink></small>
      </div>
    </section>
  </>
  );
}

export default SignUp;
