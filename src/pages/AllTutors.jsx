import React, { useState, useEffect } from 'react';
import tutorI from "../assets/tutor.png";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { NavLink } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import requireAuth from '../requireAuth';
const AllTutors = () => {

    const [allTutors, setAllTutors] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAllTutors = async () => {
        try {
          const tutorsSnapshot = await getDocs(collection(db, 'tutors'));
          const tutorsData = tutorsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAllTutors(tutorsData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching top tutors:', error);
        }
      };
  
      fetchAllTutors();
    }, []);
  //console.log(allTutors);
    return (
        <DashboardLayout>
             <section className='mx-5'>
        <h1 className='text-[18px] font-bold my-5'>Tutors on Tutorly</h1>
        {loading ? (
      <p className="text-center mt-8 text-gray-700">Loading...</p>
        ) : (
          <div className='grid my-10 justify-center   md:grid-cols-2 gap-5 lg:grid-cols-3'>
            {allTutors.map((tutor, index) => (
              <div className='bg-white w-[100%] rounded-md px-1 pt-2 pb-4 my-5 md:my-0' key={index}>
                <img src={tutor?.image || tutorI} alt="Tutor" />
                <small className='text-[11px] bg-[rgba(241,62,62,0.2)] text-[#F13E3E] px-2 py-1 rounded-[20px] inline-block my-2'>{tutor.department}</small>
                <h1 className='font-semibold text-[18px] mb-1'>{tutor.name}</h1>
                <p className='my-2'><small className='font-semibold'>Availability:</small> <small className='text-[12px]'>{tutor.availability}</small></p>
              
                <p className='flex gap-3 mb-3'>
                  {tutor.courses.join(", ")}
                </p>
                <hr className='mb-4 border-[4px] rounded-md border-[#F13E3E]' />
                <NavLink to={`/tutor/${tutor.id}`} className='block mx-auto bg-[#FF6767] w-[100%] py-[7px] text-center rounded-md hover:bg-red-700 text-white font-semibold'> Book Now</NavLink>
              </div>
            ))}
          </div>
        )}
      </section>

        </DashboardLayout>
         );
  };  

export default requireAuth(AllTutors);
