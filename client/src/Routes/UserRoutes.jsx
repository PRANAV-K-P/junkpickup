import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Pick_DateTime from "../pages/Pick_DateTime";
import Check_Availability from "../pages/Check_Availability";
import PrivateComponent from "../components/PrivateComponent";
import NavBar from "../components/NavBar";

const UserRoutes = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route element={<PrivateComponent />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="j-datetime" element={<Pick_DateTime />} />
        <Route path="j-pincode" element={<Check_Availability />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
