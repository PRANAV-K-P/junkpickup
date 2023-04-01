import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";
import AdminNavBar from "../components/AdminNavBar";
import AdminPrivateComponent from "../components/AdminPrivateComponent";
import AdminDates from "../pages/AdminDates";

const AdminRoutes = () => {
  return (
    <div>
      <AdminNavBar />
      <Routes>
        <Route element={<AdminPrivateComponent />}>
          <Route path="dashboard" element={<AdminHome />}></Route>
          <Route path="dates" element={<AdminDates />}></Route>
        </Route>
        <Route path="login" element={<AdminLogin />}></Route>
      </Routes>
    </div>
  );
};

export default AdminRoutes;
