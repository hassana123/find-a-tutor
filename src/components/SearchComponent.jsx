import React, { useState, useEffect} from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import {NavLink} from "react-router-dom"
const SearchComponent = () => {
  const [allTutors, setAllTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    const fetchAllTutors = async () => {
      try {
        const tutorsSnapshot = await getDocs(collection(db, 'tutors'));
        const tutorsData = tutorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllTutors(tutorsData);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };

    fetchAllTutors();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTutors([]);
    } else {
      const filtered = allTutors.filter(tutor =>
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTutors(filtered);
    }
  }, [searchQuery, allTutors]);

  const handleSearch = () => {
    // Additional search actions can be triggered here if needed
    console.log('Performing search...');
  };

  return (
    <section className='my-8 mx-5 gap-3 flex items-center'>
      <div className='border w-[85%] px-5 bg-white rounded-md flex items-center'>
        <BiSearchAlt2 size={20}/>
        <input
          className='w-[100%] bg-transparent border-none outline-none py-3 px-2'
          placeholder="Search for a Tutor here"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button onClick={handleSearch} className="bg-[#FF6767] text-white rounded-md px-3 py-2 ml-3">
        Search
      </button>

      {/* Display filtered tutors */}
      {filteredTutors.length > 0 && (
        <div className="mt-4">
          <h1 className="text-xl font-bold">Filtered Tutors:</h1>
          <ul>
            {filteredTutors.map(tutor => (
             <div   className='absolute  left-[27%]  bg-white w-[30%] rounded-md px-1 pt-2 pb-4 my-5 md:my-0' key={tutor.id}>
             <img src={tutor?.image || ""} alt="Tutor" />
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
          </ul>
        </div>
      )}
    </section>
  );
};

export default SearchComponent;
