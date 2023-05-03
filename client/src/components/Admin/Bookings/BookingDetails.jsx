import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../api/axiosInstance';
import { useParams } from 'react-router-dom';

const BookingDetails = () => {
    const [items, setItems] = useState([]);
    const [addressData, setAddressData] = useState({});
    const [bookingData, setBookingData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        (async () => {
          try {
            let response = await axiosInstance.get(`/bookings/admin/${id}`, {
              headers: {
                Authorization: `Bpickj ${JSON.parse(
                  localStorage.getItem("adminToken")
                )}`,
              },
            });
            if (response.data) {
              const res = response.data;
              let formattedDate = new Date(res.date);
              const options = {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              };
              formattedDate = formattedDate.toLocaleDateString("en-US", options);
              res.date = formattedDate;
              setBookingData(res);
              setAddressData(res.deliveryDetails);
              setItems(res.products);
            }
          } catch (err) {}
        })();
      }, [id]);


  return (
    <div className="bg-sky-blue w-full min-h-screen  flex justify-center items-center ">
    <div className="w-full h-5/6">

      <div className=" p-5 sm:p-5 w-full lg:mt-2 flex justify-center items-center ">
        <div className="bg-white w-full sm:w-4/5">
          <div className="relative overflow-x-auto shadow-md">
            <div className="flex flex-col lg:flex-row">
              <div className="bg-white border border-gray-200 shadow-2xl w-full lg:w-1/3 p-2 mb-3 lg:mb-0 lg:p-5 rounded-xl lg:rounded-none overflow-hidden lg:overflow-visible ">
  
                    <div className="px-5 py-0 lg:py-4 shadow-xl border border-gray-100 bg-white rounded-full mb-2 lg:mb-5">
                      <span className="text-xl font-bold">Date: </span>
                      <span className="text-xl">{bookingData.date}</span>
                    </div>
                    <div className="px-5 py-0 lg:py-4 shadow-xl border border-gray-100 bg-white rounded-full mb-2 lg:mb-5">
                      <span className="text-xl font-bold">Time: </span>
                      <span className="text-xl">{bookingData.time}</span>
                    </div>
                    <div className="px-5 py-0 lg:py-4 shadow-xl border border-gray-100 bg-white rounded-full mb-2 lg:mb-5">
                      <span className="text-xl font-bold">Status: </span>
                      <span className="text-xl">{bookingData.status}</span>
                    </div>

              </div>
              <div className="bg-white border border-gray-200 shadow-2xl w-full lg:w-1/3 mb-3 lg:mb-0 rounded-xl lg:rounded-none overflow-hidden lg:overflow-visible">
                <div className="px-5 py-1 lg:py-2  mb-2 lg:mb-5 bg-white border border-gray-300">
                  <span className="text-xl font-bold justify-center flex">
                    Items
                  </span>
                </div>
                {items.map((item) => (
                  <div className="flex justify-center py- ml-auto mr-auto border border-gray-200 shadow-xl w-2/3 bg-white mb-1 lg:mb-2">
                    <span className=" text-lg lg:text-xl">{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-gray-200 shadow-2xl w-full lg:w-1/3 mb-3 lg:mb-0 rounded-xl lg:rounded-none overflow-hidden lg:overflow-visible ">
                <div className="px-5 py-0 lg:py-2 bg-white mb-2 lg:mb-5 border border-gray-300 ">
                  <span className="text-xl font-bold justify-center flex">
                    Address Details
                  </span>
                </div>
                {Object.entries(addressData).map(
                  ([key, value]) =>
                    key !== "addressId" && (
                      <div className="px-5 py-0 lg:py-2 shadow-xl rounded-full mb-2 bg-white border border-gray-100">
                        <span className="text-xl font-bold">{key}: </span>
                        <span className="text-xl">{value}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
    </div>
  )
}

export default BookingDetails