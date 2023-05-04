import React from "react";
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";
import BookingDetails from "../../components/Admin/Bookings/BookingDetails";

const BookingDetailsPage = () => {
  return (
    <div className="flex min-h-full ">
      <AdminSideBar />
      <BookingDetails />
    </div>
  );
};

export default BookingDetailsPage;
