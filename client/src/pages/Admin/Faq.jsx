import React from 'react'
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";
import Faq from '../../components/Admin/Faq/Faq';

const FaqPage = () => {
  return (
    <div className="flex min-h-full ">
    <AdminSideBar />
    <Faq />
  </div>
  )
}

export default FaqPage