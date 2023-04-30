import React from 'react'
import AdminSideBar from '../../components/Admin/Navigation/AdminSideBar';
import RecycleDetails from '../../components/Admin/Recycle/RecycleDetails'

const RecycleDetailsPage = () => {
  return (
    <>
    <div className="flex min-h-full ">
        <AdminSideBar />
        <RecycleDetails />
      </div>
    </>
  )
}

export default RecycleDetailsPage