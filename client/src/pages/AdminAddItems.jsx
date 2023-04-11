import React from "react";
import AdminAddItems from "../components/AdminAddItems";
import AdminSideBar from "../components/AdminSideBar";

const AdminAddItemsPage = () => {
  return (
    <div className="flex">
      <AdminSideBar />
      <AdminAddItems />
    </div>
  );
};

export default AdminAddItemsPage;
