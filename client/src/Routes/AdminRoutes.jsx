import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";
import AdminNavBar from "../components/AdminNavBar";
import AdminPrivateComponent from "../components/AdminPrivateComponent";

const AdminRoutes = () => {
  return (
    <div>
      <AdminNavBar />
      <Routes>
        <Route element={<AdminPrivateComponent />}>
          <Route path="dashboard" element={<AdminHome />}></Route>
        </Route>
        <Route path="login" element={<AdminLogin />}></Route>
      </Routes>
    </div>
  );
};

export default AdminRoutes;
