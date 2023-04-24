import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import backgroundImage from ".././assets/images/commonbackground.jpg";
import axiosInstance from "../api/axiosInstance";

const ConfirmBooking = () => {
  const { date } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.user);
  const { type } = useSelector((state) => state.user);
  const { addressId } = useSelector((state) => state.user);
  const [newDate, setNewDate] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    (async () => {
      try {
        let formattedDate = new Date(date);
        console.log(formattedDate, "-- before");
        const options = {
          weekday: "short",
          month: "long",
          day: "numeric",
          year: "numeric",
        };
        formattedDate = formattedDate.toLocaleDateString("en-US", options);
        console.log(formattedDate, "-- after");
        setNewDate(formattedDate);

        let URL = "/users/address-data";
        let response = await axiosInstance.get(URL, {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
          params: {
            userId,
            addressId,
          },
        });
        if (response.data) {
          setName(response.data.name);
          setAddress(response.data.address);
          setPincode(response.data.pincode);
          setCity(response.data.city);
          setMobile(response.data.mobile);
          setEmail(response.data.email);
        }
      } catch (err) {}
    })();
  }, []);

  const handleSubmit = () => {
    //
  };
  return (
    <div className="relative w-full bg-white flex flex-col justify-end ">
      <img
        className="absolute w-full h-[650px] z-0 top-0 object-cover"
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <h2 className="z-50 text-white font-semibold ml-[55%] top-30 mb-10 mt-6 text-xl">
        step 4 out of 4
      </h2>
      <div className="relative bg-white  z-10 w-full">
        <div className="md:col-span-2">
          <div className="bg-white ml-2 mr-2 sm:ml-72 rounded-lg shadow-2xl border mt-7 border-gray-300 py-8 px-16 mb-3 sm:w-2/4">
            <div className="mb-6 w-full">
              <div className="flex flex-wrap items-center bg-white mb-4 ">
                <FaArrowCircleRight className="text-blue-600 mr-4 text-2xl" />{" "}
                <span className="text-2xl">Review details and confirm</span>
              </div>
              <div className="font-bold text-xl bg-white">Pick-up Date</div>
              <div className="text-1xl font-semibold mb-2">{newDate}</div>
              <div className="font-bold text-xl">Arrival Time</div>
              <div className="text-1xl font-semibold">{time}</div>
            </div>
            <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="mb-2">
            <span className="font-bold text-xl">For: </span>
            <span className="text-1xl font-semibold">{type}</span>
            </div>
            <div className="mb-2">
            <span className="font-bold text-xl">Name: </span>
            <span className="text-1xl font-semibold mb-2">{name}</span>

            </div>
            <div className="font-bold text-xl">Address: </div>
            <div className="text-1xl font-semibold mb-1">{address}</div>
            <div className="text-1xl font-semibold mb-1">{city}</div>
            <div className="text-1xl font-semibold mb-1">{pincode}</div>
            <div className="font-bold text-xl">Phone number: </div>
            <div className="text-1xl font-semibold">{mobile}</div>
            <div className="font-bold text-xl">Email address: </div>
            <div className="text-1xl font-semibold">{email}</div>
          </div>
          <div className=" sm:ml-72 ml-2 mr-2 sm:w-2/4 mt-7 px-5 mb-3 w-2/4">
            <button
              className="w-184 h-43 bg-yellow-400 text-black font-bold px-2 py-2 w-60  mb-5  mt-5"
              type="button"
              onClick={handleSubmit}
            >
              Confirm Pick up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
