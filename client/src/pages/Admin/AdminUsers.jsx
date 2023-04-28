import React from "react";
import AdminUsers from "../../components/Admin/Users/AdminUsers";
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";

const AdminUsersPage = () => {
  return (
    <div className="flex min-h-full ">
      <AdminSideBar />
      <AdminUsers />
    </div>
  );
};

export default AdminUsersPage;
