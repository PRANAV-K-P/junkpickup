import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminHome />}></Route>
        <Route path="login" element={<AdminLogin />}></Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
