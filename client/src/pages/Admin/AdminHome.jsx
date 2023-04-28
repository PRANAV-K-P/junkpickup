import React from "react";
import AdminDashboard from "../../components/Admin/Home/AdminDashboard";
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";
const AdminHome = () => {
  return (
    <div className="flex">
      <AdminSideBar />
      <AdminDashboard />
    </div>
  );
};

export default AdminHome;
