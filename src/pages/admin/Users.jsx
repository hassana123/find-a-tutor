import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';
import AdminDashboardLayout from '../../components/admin/AdminLayout';
function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (userId) => {
    const selectedUser = users.find(user => user.id === userId);
    setSelectedUser(selectedUser);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      setDeleting(true);
      await deleteDoc(doc(db, 'users', userId));
      console.log('User deleted successfully');
      setDeleting(false);
      // Refresh the user list after deletion
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user: ', error);
      setDeleting(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
              <th className="py-2 px-4 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.status}</td>
                <td className="py-2 px-4 border">
                  <button onClick={() => handleViewUser(user.id)} className="text-blue-500 hover:underline focus:outline-none">View Details</button>
                </td>
                <td className="py-2 px-4 border">
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none">{deleting ? 'Deleting...' : 'Delete'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
            <AiOutlineClose onClick={handleCloseModal} className='float-right text-red-600 cursor-pointer' size={24} />
            <h3 className="text-xl font-semibold mb-4">User Details</h3>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            {/* Add more user details here */}
          </div>
        </div>
      )}
    </div>
    </AdminDashboardLayout>
  );
}

export default Users;
