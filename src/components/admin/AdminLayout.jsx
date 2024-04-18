import React from 'react';
import AdminNav from './AdminNav';

const AdminDashboardLayout = ({ children }) => {
  return (
    <div>
      <AdminNav />
      <div className="container mx-auto py-8">
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
