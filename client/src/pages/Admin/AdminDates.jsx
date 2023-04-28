import React from "react";
import AdminDates from "../../components/Admin/Date/AdminDates";
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";

const AdminDatePages = () => {
  return (
    <div className="flex min-h-full ">
      <AdminSideBar />
      <AdminDates />
    </div>
  );
};

export default AdminDatePages;
