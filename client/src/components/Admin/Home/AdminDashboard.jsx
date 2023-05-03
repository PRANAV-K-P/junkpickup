import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const AdminDashboard = () => {
  const [bookingCount, setBookingCount] = useState("");
  const [userCount, setUserCount] = useState("");

  const getBookingCount = async () => {
    let response = await axiosInstance.get("/bookings/count", {
      headers: {
        Authorization: `Bpickj ${JSON.parse(
          localStorage.getItem("adminToken")
        )}`,
      },
    });
    if (response.data) {
      setBookingCount(response.data.bookings);
    }
  };

  const getuserCount = async () => {
    let response = await axiosInstance.get("/admin/user-count", {
      headers: {
        Authorization: `Bpickj ${JSON.parse(
          localStorage.getItem("adminToken")
        )}`,
      },
    });
    if (response.data) {
      setUserCount(response.data.users);
    }
  };

  useEffect(() => {
    getBookingCount();
    getuserCount();
  }, []);

  return (
    <div className="bg-sky-blue w-full min-h-screen  flex justify-center items-center ">
      <div className="w-full h-5/6">
        <div className=" p-5 sm:p-5 w-full lg:mt-2 flex justify-center items-center ">
          <div className=" w-full sm:w-4/5">
            <div className="relative overflow-x-auto ">
              <div className="flex flex-col lg:flex-row">
                <div className="border mr-32 border-gray-400 shadow-2xl w-full lg:w-1/3 p-2 mb-3 lg:mb-0 lg:p-5 rounded-xl lg:rounded-none overflow-hidden lg:overflow-visible ">
                  <div className="px-5 py-0 lg:py-4 shadow-xl border flex justify-center border-gray-100 bg-white rounded-full mb-2 lg:mb-5">
                    <span className="text-2xl">Total Bookings</span>
                  </div>
                  <div className="flex justify-center ">
                    <div className="px-5 py-0 lg:py-4 shadow-xl border flex items-center justify-center w-32 h-32 border-gray-100 bg-white rounded-full mb-2 lg:mb-5">
                      <span className="text-4xl font-bold">{bookingCount}</span>
                    </div>
                  </div>
                </div>

                <div className=" border border-gray-400 shadow-2xl w-full lg:w-1/3 p-2 mb-3 lg:mb-0 lg:p-5 rounded-xl lg:rounded-none overflow-hidden lg:overflow-visible ">
                  <div className="px-5 py-0 lg:py-4 shadow-xl border flex justify-center border-gray-100 bg-white rounded-full mb-2 lg:mb-5">
                    <span className="text-2xl">Total Users</span>
                  </div>
                  <div className="flex justify-center ">
                    <div className="px-5 py-0 lg:py-4 shadow-xl border flex items-center justify-center w-32 h-32 border-gray-100 bg-white rounded-full mb-2 lg:mb-5">
                      <span className="text-4xl font-bold">{userCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
