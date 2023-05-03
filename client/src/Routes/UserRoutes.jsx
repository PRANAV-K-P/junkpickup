import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages//User/Login";
import Signup from "../pages/User/Signup";
import Home from "../pages/User/Home";
import Pick_DateTime from "../pages/User/Pick_DateTime";
import Check_Availability from "../pages/User/Check_Availability";
import PrivateComponent from "../components/Authorization/PrivateComponent";
import NavBar from "../components/User/NavBar/NavBar";
import Profile from "../pages/User/Profile";
import AddressDetails from "../pages/User/AddressDetails";
import ConfirmBooking from "../pages/User/ConfirmBooking";
import Confirmation from "../pages/User/Confirmation";
import ViewBookings from "../pages/User/ViewBookings";
import About from "../pages/User/About";
import Recycle from "../pages/User/Recycle";
import Page404 from "../utils/Page404";
import BookingDetails from "../pages/User/BookingDetails";
import ConnectPage from "../pages/User/Connect";

const UserRoutes = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="profile" element={<Profile />} />
          <Route path="pick-datetime" element={<Pick_DateTime />} />
          <Route path="address-details" element={<AddressDetails />} />
          <Route path="booking" element={<ConfirmBooking />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="view-bookings" element={<ViewBookings />} />
          <Route path="view-bookings/:id" element={<BookingDetails />} />
          <Route path="connect" element={<ConnectPage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="check-pincode" element={<Check_Availability />} />
        <Route path="recycle" element={<Recycle />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="/*" element={<Page404 user={true} />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
