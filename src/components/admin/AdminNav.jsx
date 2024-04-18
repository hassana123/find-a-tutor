import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/admin/applications" className="hover:text-gray-300">Manage Applications</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="hover:text-gray-300">Manage Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin/tutors" className="hover:text-gray-300">Manage Tutors</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
