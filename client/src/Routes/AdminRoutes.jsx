import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";
import AdminNavBar from "../components/partials/AdminNavBar";
import AdminPrivateComponent from "../components/authentication/AdminPrivateComponent";
import AdminDates from "../pages/AdminDates";
import AdminUsers from "../pages/AdminUsers";

import AdminAddItems from "../pages/AdminAddItems";
import Logout from "../utils/Logout";
import Page404 from "../utils/Page404";

const AdminRoutes = () => {
  return (
    <div>
      <AdminNavBar />
      <Routes>
        <Route element={<AdminPrivateComponent />}>
          <Route path="dashboard" element={<AdminHome />}></Route>
          <Route path="dates" element={<AdminDates />}></Route>
          <Route path="users" element={<AdminUsers />}></Route>
          <Route path="items" element={<AdminAddItems />}></Route>
          <Route path="logout" element={<Logout />}></Route>
        </Route>
        <Route path="login" element={<AdminLogin />}></Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
