import React from "react";
import AdminDates from "../components/AdminDates";
import AdminSideBar from "../components/AdminSideBar";

const AdminDatePages = () => {
  return (
    <div className="flex min-h-full ">
      <AdminSideBar />
      <AdminDates />
    </div>
  );
};

export default AdminDatePages;
