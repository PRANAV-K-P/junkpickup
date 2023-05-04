import React from "react";
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";
import Recycle from "../../components/Admin/Recycle/Recycle";

const RecyclePage = () => {
  return (
    <>
      <div className="flex min-h-full ">
        <AdminSideBar />
        <Recycle />
      </div>
    </>
  );
};

export default RecyclePage;
