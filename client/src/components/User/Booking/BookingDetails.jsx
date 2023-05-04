import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import backgroundImage from "../../../assets/images/commonbackground.jpg";
import axiosInstance from "../../../api/axiosInstance";

const BookingDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [addressData, setAddressData] = useState({});
  const [bookingData, setBookingData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let BOOKING = `/bookings/user/${id}`;
        let response = await axiosInstance.get(BOOKING, {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
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
          setIsLoading(false);
        }
      } catch (err) {}
    })();
  }, [id]);

  return (
    <div className="relative w-full lg:h-[697px] bg-red-400 z-40 flex flex-col bg-no-repeat">
      <img
        className="absolute w-full h-full top-0 object-cover "
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <div className=" p-5 sm:p-5 w-full lg:mt-2 flex justify-center items-center ">
        <div className="bg-white w-full sm:w-4/5">
          <div className="relative overflow-x-auto shadow-md">
            <div className="flex flex-col lg:flex-row">
              <div className="bg-cyan-50 shadow-2xl w-full lg:w-1/3 p-2 mb-3 lg:mb-0 lg:p-5 rounded-xl lg:rounded-none overflow-hidden lg:overflow-visible ">
                {isLoading ? (
                  <p className="mt-5 flex justify-center">
                    <Skeleton
                      count={3}
                      className="rounded-full mb-5"
                      width={400}
                      height={35}
                    />
                  </p>
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <div className="bg-cyan-50 shadow-2xl w-full lg:w-1/3 mb-3 lg:mb-0 rounded-xl lg:rounded-none overflow-hidden lg:overflow-visible">
                <div className="px-5 py-1 lg:py-2  mb-2 lg:mb-5 bg-white border border-gray-300">
                  <span className="text-xl font-bold justify-center flex">
                    Items
                  </span>
                </div>
                {isLoading && (
                  <p className="mt-5 flex justify-center">
                    <Skeleton
                      count={3}
                      className="rounded-full mb-5"
                      width={400}
                      height={35}
                    />
                  </p>
                )}
                {items.map((item) => (
                  <div className="flex justify-center py- ml-auto mr-auto border border-gray-200 shadow-xl w-2/3 bg-white mb-1 lg:mb-2">
                    <span className=" text-lg lg:text-xl">{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="bg-cyan-50 shadow-2xl w-full lg:w-1/3 mb-3 lg:mb-0 rounded-xl lg:rounded-none overflow-hidden lg:overflow-visible ">
                <div className="px-5 py-0 lg:py-2 bg-white mb-2 lg:mb-5 border border-gray-300 ">
                  <span className="text-xl font-bold justify-center flex">
                    Address Details
                  </span>
                </div>
                {isLoading && (
                  <p className="mt-5 flex justify-center">
                    <Skeleton
                      count={3}
                      className="rounded-full mb-5"
                      width={400}
                      height={35}
                    />
                  </p>
                )}
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
  );
};

export default BookingDetails;
