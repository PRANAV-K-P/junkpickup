import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminHome from "../pages/Admin/AdminHome";
import AdminNavBar from "../components/Admin/Navigation/AdminNavBar";
import AdminPrivateComponent from "../components/Authorization/AdminPrivateComponent";
import AdminDates from "../pages/Admin/AdminDates";
import AdminUsers from "../pages/Admin/AdminUsers";

import AdminAddItems from "../pages/Admin/AdminAddItems";
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
