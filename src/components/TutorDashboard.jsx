import React, { useState, useEffect, useContext } from 'react';
import Chart from 'chart.js/auto';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../UserContext';

const TutorDashboard = () => {
  const [bookingStats, setBookingStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);
  const tutorId = user?.id;

  useEffect(() => {
    const fetchBookingStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `tutors/${tutorId}/sessions`));
        const sessionsData = querySnapshot.docs.map(doc => doc.data());

        // Calculate statistics
        const acceptedBookings = sessionsData.filter(session => session.status === 'accepted').length;
        const pendingBookings = sessionsData.filter(session => session.status === 'pending').length;
        const rejectedBookings = sessionsData.filter(session => session.status === 'rejected').length;
        const canceledBookings = sessionsData.filter(session => session.status === 'canceled').length;
        const totalBookings = sessionsData.length;

        setBookingStats({
          accepted: acceptedBookings,
          pending: pendingBookings,
          rejected: rejectedBookings,
          canceled: canceledBookings,
          total: totalBookings
        });

        setLoading(false);
      } catch (error) {
        setError('Error fetching booking statistics');
        console.error('Error fetching booking statistics:', error);
        setLoading(false);
      }
    };

    fetchBookingStats();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      // Render chart once data is loaded and there are no errors
      renderChart();
    }
  }, [loading, error]);

  const renderChart = () => {
    const ctx = document.getElementById('bookingChart');

    new Chart(ctx, {
      type: 'doughnut', // Change chart type to doughnut
      data: {
        labels: ['Accepted', 'Pending', 'Rejected', 'Canceled', 'Total'],
        datasets: [{
          label: 'Booking Statistics',
          data: [
            bookingStats.accepted,
            bookingStats.pending,
            bookingStats.rejected,
            bookingStats.canceled,
            bookingStats.total
          ],
          backgroundColor: [
            'rgba(0, 255, 0, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 0, 0, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(0, 255, 0, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 0, 0, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'right' // Adjust legend position
          }
        }
      }
    });
  };
  return (
    
    <div className="w-[60%]  mx-auto h-[70vh] mx-5 bg-white px-3 shadow-md py-5">
    <h1 className="text-[18px] my-5">Hello Tutor {user?.name}. <br/> Today is going to be a great Day</h1>
    {loading ? (
      <p className="text-center mt-8 text-gray-700">Loading...</p>
    ) : error ? (
      <p className="text-center mt-8 text-red-500">Error: {error}</p>
    ) : (
      <canvas id="bookingChart" width="400" height="200"></canvas>
    )}
  </div>
  );
};

export default TutorDashboard;
