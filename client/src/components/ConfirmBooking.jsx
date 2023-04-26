import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import backgroundImage from ".././assets/images/commonbackground.jpg";
import axiosInstance from "../api/axiosInstance";
import {updateDate, updateTimeId, updateItems, updateTime, updateAddressId, updatePincode, updateType} from "../redux/user";

const ConfirmBooking = () => {
  const { date } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.user);
  const { timeId } = useSelector((state) => state.user);
  const { type } = useSelector((state) => state.user);
  const { addressId } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.user);
  const [newDate, setNewDate] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [addressData, setAddressData] = useState({});
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    (async () => {
      try {
        let formattedDate = new Date(date);
        const options = {
          weekday: "short",
          month: "long",
          day: "numeric",
          year: "numeric",
        };
        formattedDate = formattedDate.toLocaleDateString("en-US", options);
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
          setAddressData(response.data);
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

  const updateTimeStatus = async (date,timeId) => {
    try {
      const TIME = "/datetime/bookings"
      let response = await axiosInstance.put(TIME,
        {
          date,
          timeId
        },
        {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
        })
        if (response.data) {
          return true;
        }
    } catch(err) {
      setServerError(true);
      setMessage(err.response?.data?.message);
    }
  }

  const handleSubmit = async () => {
    try {
      const BOOKING = "/booking";
      let response = await axiosInstance.post(
        BOOKING,
        {
          userId,
          items,
          addressData,
          date,
          time
        },
        {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
        }
      );
      if (response.data) {
        await updateTimeStatus(date,timeId);
        dispatch(updateDate(null));
        dispatch(updateTimeId(""));
        dispatch(updateItems([]));
        dispatch(updateTime(""));
        dispatch(updateAddressId(""));
        dispatch(updatePincode(""));
        dispatch(updateType(""));
        navigate('/confirmation');
      }
    } catch (err) {
      setServerError(true);
      setMessage(err.response?.data?.message);
    }
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
              {serverError && (
                <span className="mt-1 mb-1 p-2 text-white bg-red-500 font-medium block ml-0">
                  {message}
                </span>
              )}
              <div className="flex flex-wrap items-center bg-white mb-4 ">
                <FaArrowCircleRight className="text-blue-600 mr-4 text-2xl" />{" "}
                <span className="text-2xl">Review details and confirm</span>
              </div>
              <div className="font-bold text-xl bg-white">Pick-up Date</div>
              <div className="text-xl font-semibold mb-2">{newDate}</div>
              <div className="font-bold text-xl">Arrival Time</div>
              <div className="text-xl font-semibold">{time}</div>
            </div>
            <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="mb-2">
              <span className="font-bold text-xl">For: </span>
              <span className="text-xl font-semibold">{type}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-xl">Name: </span>
              <span className="text-xl font-semibold mb-2">{name}</span>
            </div>
            <div className="font-bold text-xl">Address: </div>
            <div className="text-xl font-semibold mb-1">{address}</div>
            <div className="text-xl font-semibold mb-1">{city}</div>
            <div className="text-xl font-semibold mb-1">{pincode}</div>
            <div className="font-bold text-xl">Phone number: </div>
            <div className="text-xl font-semibold">{mobile}</div>
            <div className="font-bold text-xl">Email address: </div>
            <div className="text-xl font-semibold">{email}</div>
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
