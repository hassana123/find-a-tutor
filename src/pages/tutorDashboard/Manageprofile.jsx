
import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import requireAuth from '../../requireAuth';
import courses from '../../data/courses';
import departments from '../../data/department';
import { setField, startSubmitting, submitSuccess, submitError } from '../../authComponents/applicationSlice'; // Import actions from Redux slice
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Import Firebase db instance
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
const ManageProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const formData = useSelector((state) => state.application);
const {user} = useContext(UserContext);
//console.log(user);
  useEffect(() => {
    // Fetch tutor's details from the database and set them in the form fields
    const fetchTutorDetails = async () => {
      try {
        // Fetch tutor's details based on the logged-in user ID
        const tutorDocRef = doc(db, 'tutors', user?.id);
        const tutorDocSnap = await getDoc(tutorDocRef);
        if (tutorDocSnap.exists()) {
          // Set form fields with fetched data
          const tutorData = tutorDocSnap.data();
          dispatch(setField({ field: 'name', value: tutorData.name }));
          dispatch(setField({ field: 'email', value: tutorData.email }));
          dispatch(setField({ field: 'bio', value: tutorData.bio }));
          dispatch(setField({ field: 'experience', value: tutorData.experience }));
          dispatch(setField({ field: 'availability', value: tutorData.availability }));
          dispatch(setField({ field: 'courses', value: tutorData.courses }));
          dispatch(setField({ field: 'department', value: tutorData.department }));
          dispatch(setField({ field: 'pricing', value: tutorData.pricing }));
          setLoading(false);
        } else {
          setError('Tutor data not found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching tutor details:', error);
        setError('Error fetching tutor details');
        setLoading(false);
      }
    };

    fetchTutorDetails();
  }, []);

  const handleChange = (e) => {
    dispatch(setField({ field: e.target.name, value: e.target.value }));
  };
  const handleCourseRemove = (course) => {
    const updatedCourses = selectedCourses.filter(item => item !== course);
    setSelectedCourses(updatedCourses);
    dispatch(setField({ field: 'courses', value: updatedCourses }));
  };
  const handleCourseSelect = (e) => {
    const selectedCourse = e.target.value;
    if (selectedCourses.length < 3 && !selectedCourses.includes(selectedCourse)) {
      const updatedCourses = [...selectedCourses, selectedCourse];
      setSelectedCourses(updatedCourses);
      dispatch(setField({ field: 'courses', value: updatedCourses }));
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startSubmitting());

    try {
      // Update tutor's details in the database
      await updateDoc(doc(db, 'tutors', user.uid), {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        experience: formData.experience,
        availability: formData.availability,
        courses: formData.courses,
        department: formData.department,
        pricing: formData.pricing
      });
      dispatch(submitSuccess());
      // Redirect to dashboard or another page after successful submission
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating tutor details:', error);
      dispatch(submitError('Error updating tutor details. Please try again later.'));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
<DashboardLayout>
<div className="max-w-lg mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="name" className="block font-semibold mb-1">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3" placeholder="Enter your full name" required />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3" placeholder="Enter your email address" required />
        </div>
        <div>
          <label htmlFor="bio" className="block font-semibold mb-1">Tell us about yourself</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} className="block w-full h-24 border border-gray-300 rounded-md py-2 px-3" placeholder="Enter your bio" required></textarea>
        </div>
        <div>
          <label htmlFor="experience" className="block font-semibold mb-1">Previous Tutoring Experience</label>
          <textarea name="experience" value={formData.experience} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3 h-24" placeholder="Enter your previous tutoring experience"></textarea>
        </div>
        <div>
          <label htmlFor="availability" className="block font-semibold mb-1">Availability</label>
          <input type="text" name="availability" value={formData.availability} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3" placeholder="Enter your availability" required />
        </div>
        <div>
          <label htmlFor="courses" className="block font-semibold mb-1">Courses You Can Teach</label>
          <select
            name="courses"
            onChange={handleCourseSelect}
            className="block w-full border border-gray-300 rounded-md py-2 px-3"
            value={formData.courses}
          
          >
            <option value="">Select Courses</option>
            {courses.map((course, index) => (
              <option key={index} value={course.code}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap mt-2">
                {selectedCourses.map(course => (
                  <div key={course} className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 mr-2 mb-2 flex items-center">
                    <span className="mr-2">{course}</span>
                    <button type="button" onClick={() => handleCourseRemove(course)} className="focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
        <div>
          <label htmlFor="department" className="block font-semibold mb-1">Department</label>
          <select
            name="department"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md py-2 px-3"
            value={formData.department}
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pricing" className="block font-semibold mb-1">Pricing (per hour)</label>
          <input type="number" name="pricing" value={formData.pricing} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3" placeholder="Enter pricing" required />
        </div>
        <button type="submit" disabled={formData.isSubmitting} className="block bg-[#F13E3E] hover:bg-red-700 text-white font-semibold py-2 px-10 rounded-md">{formData.isSubmitting ? "Submitting..." : "Save Changes"}</button>
      </form>
    </div>

</DashboardLayout>   
);
};

export default requireAuth(ManageProfile, true);
