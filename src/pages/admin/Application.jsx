import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase'; // Import Firebase db instance
import { collection, getDocs, doc, getDoc, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';
import { v4 as uuid } from "uuid";
import emailjs from "@emailjs/browser"
import AdminDashboardLayout from '../../components/admin/AdminLayout';
function Applications() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [accepting, setAccepting] = useState(false)
  useEffect(() => {
    // Fetch all tutor applications from Firestore
    const fetchApplications = async () => {
      try {
        const applicationsSnapshot = collection(db, 'applications');
        const querySnapShot = await getDocs(applicationsSnapshot);
        const applicationsData = querySnapShot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching applications: ', error);
      }
    };

    fetchApplications();
  }, []);

  const handleViewApplication = (applicationId) => {
    // Find the selected application
    const selectedApp = applications.find(app => app.id === applicationId);
    setSelectedApplication(selectedApp);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  const handleAcceptApplication = async (applicationId) => {
    try {
      setAccepting(true)
      // Update application status to 'accepted'
      await updateDoc(doc(db, 'applications', applicationId), { status: 'accepted', isPending:false, });

      // Fetch the user that applied for the application
      const applicationDocRef =  doc(db, 'applications', applicationId);
      const applicationDoc = await getDoc(applicationDocRef)
      const applicationData = applicationDoc.data();

      // Update user's isTutor field to true
      await updateDoc(doc(db, 'users', applicationId), { isTutor: true, applicationPending:false, status:"accepted" });
      
      // Create a document in tutors collection with the same id
      await setDoc(doc(db, 'tutors', applicationId), { ...applicationData });

      // Send acceptance email to the user
      const websiteLink = 'https://tutor-ly.vercel.app/'; 
      const templateParams = {
        to_email: applicationData.email,
        subject: 'Congratulations! You have been selected as a tutor',
        message: `Dear ${applicationData.name},\n\nWe are thrilled to inform you that you have been selected as a tutor with us. This is a significant milestone, and we congratulate you on this achievement! As a tutor, you will have the opportunity to share your knowledge and expertise, positively impacting the lives of many learners.\n\nYour journey as a tutor begins now. We encourage you to login to your account to explore options available to you. From managing your profile to scheduling sessions, our platform offers a seamless experience designed to support your tutoring journey.\n\nThank you for choosing to be a part of our community. We look forward to seeing you thrive as a tutor!\n\nBest regards,\nThe Tutorly Team \n\n Login to your account: <a href="${websiteLink}">Tutorly</a>`,
      };
      
    //await emailjs.send('service_co0qdum', 'template_fmcumye', templateParams, 'fMDmIeULGLnsvqA7f');
    emailjs.init("fMDmIeULGLnsvqA7f");
    emailjs.send("service_co0qdum","template_fmcumye", templateParams)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
      console.log('Application Accepted successfully');
      setAccepting(false);
    } catch (error) {
      console.error('Error accepting application: ', error);
      setAccepting(false);

    }
  };

  const handleRejectApplication =  async (applicationId) => {
    try {
      setAccepting(true)
      // Update application status to 'accepted'
      await updateDoc(doc(db, 'applications', applicationId), { status: 'rejected', isPending:false, });

      // Fetch the user that applied for the application
      const applicationDocRef =  doc(db, 'applications', applicationId);
      const applicationDoc = await getDoc(applicationDocRef)
      const applicationData = applicationDoc.data();

      // Update user's isTutor field to true
      await updateDoc(doc(db, 'users', applicationId), { isTutor: true, applicationPending:false, status:"rejected" });
     

     ;

      // Send acceptance email to the user
      const templateParams = {
        to_email: applicationData.email,
        subject: 'Tutor Application Status Update',
        message: `Dear ${applicationData.name},\n\nWe regret to inform you that your tutor application has been rejected. Thank you for your interest in becoming a tutor with us.\n\nBest regards,\nThe Tutorly Team`
      };
    //await emailjs.send('service_co0qdum', 'template_fmcumye', templateParams, 'fMDmIeULGLnsvqA7f');
    emailjs.init("fMDmIeULGLnsvqA7f");
    emailjs.send("service_co0qdum","template_fmcumye", templateParams)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
      console.log('Application Rejected successfully');
      setAccepting(false);
    } catch (error) {
      console.error('Error Rejecting application: ', error);
      setAccepting(false);

    }
    console.log('Rejecting application with ID: ', applicationId);
  };
//console.log(applications);
  return (
    <AdminDashboardLayout>
      <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Tutor Applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
              <th className="py-2 px-4 border">Accept</th>
              <th className="py-2 px-4 border">Reject</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(application => (
              <tr key={application.id} className="border-b border-gray-200">
                <td className="py-2 px-4 border">{application.name}</td>
                <td className="py-2 px-4 border">{application.email}</td>
                <td className="py-2 px-4 border">{application.department}</td>
                <td className="py-2 px-4 border">{application.status}</td>
                <td className="py-2 px-4 border">
                  <button onClick={() => handleViewApplication(application.id)} className="text-blue-500 hover:underline focus:outline-none">View Application</button>
                </td>
                <td className="py-2 px-4 border">
                  {application.isPending && (
                    <button onClick={() => handleAcceptApplication(application.id)} className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded focus:outline-none">{accepting?"Accepting":"Accept"}</button>
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {application.isPending && (
                    <button onClick={() => handleRejectApplication(application.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none">Reject</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="absolute top-0 left-0 w-full   bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
           <AiOutlineClose onClick={handleCloseModal} className=' float-right text-red-600 cursor-pointer' size={24} />
            <h3 className="text-xl font-semibold mb-4">Application Details</h3>
            <p><strong>Name:</strong> {selectedApplication.name}</p>
            <p><strong>Email:</strong> {selectedApplication.email}</p>
            <p><strong>Department:</strong> {selectedApplication.department}</p>
            <p><strong>Level:</strong> {selectedApplication.level}</p>
            <p><strong>Bio:</strong> {selectedApplication.bio}</p>
            <p><strong>Experience:</strong> {selectedApplication.experience}</p>
            <p><strong>Department:</strong> {selectedApplication.department}</p>
            <p><strong>courses:</strong> {selectedApplication.courses.join(", ")}</p>
            <p className='flex items-center'><strong>School ID</strong> <img className='w-[100px] h-[150px]' src={selectedApplication.schoolId} alt="" /> </p>
            <p><strong>Image of Applicant</strong> <img src={selectedApplication.image} alt="" /> </p>
          </div>
        </div>
      )}
    </div>
    </AdminDashboardLayout>
  );
}

export default Applications;
