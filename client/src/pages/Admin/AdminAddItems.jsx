import React from "react";
import AdminAddItems from "../../components/Admin/Item/AdminAddItems";
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";

const AdminAddItemsPage = () => {
  return (
    <div className="flex">
      <AdminSideBar />
      <AdminAddItems />
    </div>
  );
};

export default AdminAddItemsPage;
