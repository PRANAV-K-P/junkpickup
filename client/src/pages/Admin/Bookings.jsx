import React from 'react'
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";
import Bookings from '../../components/Admin/Bookings/Bookings';

const BookingsPage = () => {
  return (
    <div className="flex min-h-full ">
      <AdminSideBar />
      <Bookings />
    </div>
  )
}

export default BookingsPage