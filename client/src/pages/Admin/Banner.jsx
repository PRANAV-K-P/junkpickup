import React from "react";
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";
import Banner from "../../components/Admin/Banner/Banner";

const BannerPage = () => {
  return (
    <>
      <div className="flex min-h-full ">
        <AdminSideBar />
        <Banner />
      </div>
    </>
  );
};

export default BannerPage;
