import React from 'react'
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";
import Pincode from '../../components/Admin/Pincode/Pincode';

const PincodePage = () => {
  return (
    <div className="flex min-h-full ">
      <AdminSideBar />
      <Pincode />
    </div>
  )
}

export default PincodePage