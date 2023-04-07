import React from 'react'
import AdminUsers from '../components/AdminUsers';
import AdminSideBar from '../components/AdminSideBar';

const AdminUsersPage = () => {
  return (
    <div className="flex min-h-full ">
      <AdminSideBar />
      <AdminUsers />
    </div>
  )
}

export default AdminUsersPage;