import React, { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressDiv from "./AddressDiv";
import { updateType } from "../../../redux/user";
import backgroundImage from "../../../assets/images/commonbackground.jpg";

const AddressDetails = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [newDate, setNewDate] = useState("");
  const { items } = useSelector((state) => state.user);
  const { date } = useSelector((state) => state.user);
  const { timeId } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.user);
  const { addressId } = useSelector((state) => state.user);
  const { type } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!type || !addressId) {
      setError(true);
      return false;
    }
    navigate("/booking");
  };

  useEffect(() => {
    let formattedDate = new Date(date);
    const options = {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    formattedDate = formattedDate.toLocaleDateString("en-US", options);
    setNewDate(formattedDate);
  }, []);

  return (
    <div className="relative w-full bg-white flex flex-col justify-end ">
      <img
        className="absolute w-full h-[650px] z-0 top-0 object-cover"
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <h2 className="z-50 text-white font-semibold ml-[55%] top-30 mb-10 mt-6 text-xl">
        step 3 out of 4
      </h2>
      <div className="relative bg-white  z-10 w-full">
        <div className="ml-2 sm:ml-72 mt-7 bg-white h-full grid grid-cols-1 md:grid-cols-3 ">
          <div className="md:col-span-2 pb-5">
            <div className="flex flex-wrap flex-col  bg-white border p-3 border-gray-400 shadow-xl mb-4">
              <div className="font-bold text-xl">Pick-up Time</div>
              <div className="text-1xl font-semibold">{newDate}</div>
              <div className="text-1xl font-semibold">{time}</div>
            </div>
            <div className="flex flex-wrap items-center bg-white-400 mb-4 ">
              <FaArrowCircleRight className="text-blue-600 mr-4 text-2xl" />{" "}
              <span className="text-2xl">I am Booking for</span>
            </div>
            <div className="flex flex-wrap flex-row  bg-white border p-3 border-gray-400 shadow-xl mb-4">
              {error && !type && (
                <span className="mt-1 mb-1 p-1 text-red-500 bg-white text-xl font-medium block ml-0 w-full ">
                  * Required
                </span>
              )}
              <label
                htmlFor="home"
                className="cursor-pointer flex h-10 justify-center sm:w-auto mr-4"
              >
                <div
                  className=" bg-white text-gray-700 shadow-xl border border-gray-200 font-semibold text-lg px-4  w-full sm:w-auto "
                  // onClick={() => handleTimeSelect(item)}
                >
                  <input
                    type="radio"
                    value="Home"
                    id="home"
                    onChange={(e) => dispatch(updateType(e.target.value))}
                    name="Type"
                  />{" "}
                  Home
                </div>
              </label>
              <label
                htmlFor="business"
                className="cursor-pointer flex h-10 justify-center sm:w-auto mr-4"
              >
                <div
                  className=" bg-white text-gray-700 shadow-xl border border-gray-200 text-lg px-4 font-semibold w-full sm:w-auto "
                  // onClick={() => handleTimeSelect(item)}
                >
                  <input
                    type="radio"
                    value="Business"
                    id="business"
                    onChange={(e) => dispatch(updateType(e.target.value))}
                    name="Type"
                  />{" "}
                  Business
                </div>
              </label>
            </div>
            {error && !addressId && (
              <span className="mt-1 mb-1 p-1 text-red-500 bg-white text-xl font-medium block ml-0 w-full ">
                Select any address
              </span>
            )}
            <AddressDiv />
            <div className="">
              <button
                className="w-184 h-43 bg-yellow-400 text-black font-bold px-2 py-2 w-20  mb-12  mt-5 ml-10"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
