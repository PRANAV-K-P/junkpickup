import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import AdminSideBar from "../components/AdminSideBar";
const AdminHome = () => {
  return (
    <div className="flex">
      <AdminSideBar />
      <AdminDashboard />
    </div>
  );
};

export default AdminHome;
