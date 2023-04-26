import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Pick_DateTime from "../pages/Pick_DateTime";
import Check_Availability from "../pages/Check_Availability";
import PrivateComponent from "../components/authentication/PrivateComponent";
import NavBar from "../components/partials/NavBar";
import Profile from "../pages/Profile";
import AddressDetails from "../pages/AddressDetails";
import ConfirmBooking from "../pages/confirmBooking";
import Confirmation from "../pages/Confirmation";
import ViewBookings from "../components/ViewBookings";
import Page404 from "../utils/Page404";

const UserRoutes = () => {
  return (  
    <div>
      <NavBar />
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path="profile" element={<Profile />} />
        <Route path="j-datetime" element={<Pick_DateTime />} />
        <Route path="address-details" element={<AddressDetails />} />
        <Route path="booking" element={<ConfirmBooking />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="j-pincode" element={<Check_Availability />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/*" element={<Page404 user={true} />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="view-bookings" element={<ViewBookings />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
