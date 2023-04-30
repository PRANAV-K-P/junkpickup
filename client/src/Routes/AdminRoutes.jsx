import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminHome from "../pages/Admin/AdminHome";
import AdminNavBar from "../components/Admin/Navigation/AdminNavBar";
import AdminPrivateComponent from "../components/Authorization/AdminPrivateComponent";
import AdminDates from "../pages/Admin/AdminDates";
import AdminUsers from "../pages/Admin/AdminUsers";
import Banners from "../pages/Admin/Banner";
import Recycle from "../pages/Admin/Recycle";
import RecycleDetails from "../pages/Admin/RecycleDetails"
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
          <Route path="banners" element={<Banners />}></Route>
          <Route path="recycle" element={<Recycle />}></Route>
          <Route path="recycle/:id" element={<RecycleDetails />}></Route>
          <Route path="logout" element={<Logout />}></Route>
        </Route>
        <Route path="login" element={<AdminLogin />}></Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
