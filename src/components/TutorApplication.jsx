// TutorApplication.jsx
import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField, startSubmitting, submitSuccess, submitError } from '../authComponents/applicationSlice'; // Import actions from Redux slice
import {  updateDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase'; // Import Firebase db and storage instances
import departments from '../data/department'; 
import courses from '../data/courses';
import { UserContext } from '../UserContext';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { useNavigate, NavLink } from 'react-router-dom';
function TutorApplication() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
 const user = JSON.parse(localStorage.getItem("userTutorly")) || JSON.parse(sessionStorage.getItem("userTutorly"))
console.log(user.uid);
const userContext = useContext(UserContext);
//console.log(userContext);
  const formData = useSelector((state) => state.application);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleChange = (e) => {
    if (e.target.name == 'image') {
      // Handle image upload
      const image = e.target.files[0];
      handleImageUpload(image ,"");
    } else {
      dispatch(setField({ field: e.target.name, value: e.target.value }));
    }
    if (e.target.name == 'schoolId') {
      // Handle image upload
      const schoolId = e.target.files[0];
      handleImageUpload("", schoolId);
    } else {
      dispatch(setField({ field: e.target.name, value: e.target.value }));

    }
  };

  const handleImageUpload = async (image, schoolId) => {
    try {
      const storageRef = ref(storage, `tutorImages/${image.name}`);
      const storageRef2 = ref(storage, `tutorIds/${schoolId.name}`);
      await uploadBytes(storageRef,image);
      await uploadBytes(storageRef2,schoolId);
      const url = await getDownloadURL(storageRef);
      const url2 = await getDownloadURL(storageRef2);
      console.log(url, url2);
      //setImageURL(url);
      if (image !== "") {
        dispatch(setField({ field: 'image', value: url }));
      }
      if(schoolId !== ""){
        dispatch(setField({ field: 'schoolId', value: url2 }));
      }
      // Set image URL in form data
    } catch (error) {
      console.error('Error uploading image: ', error);
      console.log(error);
      dispatch(submitError('Error uploading image. Please try again later.'));
    }
  };
  const handleCourseSelect = (e) => {
    const selectedCourse = e.target.value;
    if (selectedCourses.length < 3 && !selectedCourses.includes(selectedCourse)) {
      const updatedCourses = [...selectedCourses, selectedCourse];
      setSelectedCourses(updatedCourses);
      dispatch(setField({ field: 'courses', value: updatedCourses }));
    }
  };
 
  const handleCourseRemove = (course) => {
    const updatedCourses = selectedCourses.filter(item => item !== course);
    setSelectedCourses(updatedCourses);
    dispatch(setField({ field: 'courses', value: updatedCourses }));
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startSubmitting());

    try {
      const docRef = await setDoc(doc(db, 'applications', user.uid), {
        ...formData,
        isPending: true,
        status:"pending",
        timestamp: serverTimestamp(),
      });
      console.log('Application submitted with ID: ');
      await updateDoc(doc(db, 'users', user.uid), {
        applicationPending: true,
        status:"pending",
      });
      console.log('userDoc updated: ', );
      dispatch(submitSuccess());
    } catch (error) {
      console.error('Error submitting application: ', error);
      dispatch(submitError('Error submitting application. Please try again later.'));
    }
  };
//console.log(formData);
  return (
    <>
    {formData.submitSucessState|| userContext?.applicationPending ?
    (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
  <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully</h2>
  <p className="text-lg mb-4">Thank you for applying to become a tutor with us!</p>
  <p className="mb-4">Your application has been received and will be reviewed by our team.</p>
  <p className="mb-4">Please keep an eye on your email for further instructions about the application process.</p>
  <p className="mb-8">Applications typically take at least <span className="font-bold">3-5 business days</span> to review.</p>
  <NavLink to="/user-dashboard" className="block bg-[#F13E3E] hover:bg-red-700 text-white font-semibold py-2 px-10 rounded-md text-center mb-4">Go Back to Dashboard</NavLink>
</div>
)
:(<div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply to Become a Tutor</h2>
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
          <label htmlFor="level" className="block font-semibold mb-1">Education Level</label>
          <select name="level" value={formData.level} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3" required>
            <option value="">Select Level</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
          </select>
        </div>
        <div>
          <label htmlFor="department" className="block font-semibold mb-1">Department</label>
          <select name="department" value={formData.department} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3" required>
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block font-semibold mb-1">Upload A Clear Image of Yourself</label>
          <input type="file" name="image" onChange={handleChange} accept="image/*" className="block w-full border border-gray-300 rounded-md py-2 px-3" required />
        </div>
        <div>
          <label htmlFor="schoolId" className="block font-semibold mb-1">Upload A Clear Image of Your School ID Card</label>
          <input type="file" name="schoolId" onChange={handleChange} accept="image/*" className="block w-full border border-gray-300 rounded-md py-2 px-3" required />
        </div>
        <div>
          <label htmlFor="bio" className="block font-semibold mb-1">Tell us about yourself and why you want to be a tutor</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} className="block w-full h-[20vh] border border-gray-300 rounded-md py-2 px-3" placeholder="Enter your bio" required></textarea>
        </div>
        <div>
          <label htmlFor="experience" className="block font-semibold mb-1">Previous Tutoring Experience (if any)</label>
          <textarea  name="experience" value={formData.experience} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3  h-[20vh" placeholder="Enter your previous tutoring experience" />
        </div>
        <div>
              <label htmlFor="courses" className="block font-semibold mb-1">Select Courses You Can Teach (Maximum 3)</label>
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
            </div>
            <div>
              <label htmlFor="additionalInfo" className="block font-semibold mb-1">Additional Information</label>
              <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} className="block w-full h-[20vh] border border-gray-300 rounded-md py-2 px-3" placeholder="Enter any additional information (e.g., service fee)"></textarea>
            </div>
        <div>
          <label htmlFor="availability" className="block font-semibold mb-1">Availability (days/times you are available for tutoring)</label>
          <input type="text" name="availability" value={formData.availability} onChange={handleChange} className="block w-full border border-gray-300 rounded-md py-2 px-3" placeholder="Enter your availability" required />
        </div>
        <button type="submit" disabled={formData.isSubmitting} className="block bg-[#F13E3E] hover:bg-red-700 text-white font-semibold py-2 px-10 rounded-md">{formData.isSubmitting?"Submitting":"Submit Application"}</button>
      </form>
      
    </div>)
}
    </>  );
}

export default TutorApplication;
