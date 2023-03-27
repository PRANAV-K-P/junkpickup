import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import backgroundImage from "../../src/assets/images/commonbackground.jpg";

const Check_Availability = () => {
  const PICKUP_AVAILABILITY_URL = "/users/pickup-availability";

  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const pinRegex = /^\d{6}$/;

  const handleSubmit = async () => {
    try {
      if (!pinRegex.test(pin)) {
        setError(true);
        return false;
      }
      let response = await axiosInstance.post(PICKUP_AVAILABILITY_URL,{ pin });
      if (response.data.isValid) {
        console.log("Entered pincode is available", response.data.pin);
        navigate("/j-datetime");
      } else {
        setServerError(true);
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log("err -", err);
    }
  };

  return (
    <div className=" w-full h-3/6">
      <div className="relative">
        <img
          className="w-full h-[550px] sm:h-[35rem] sm:max-w-full"
          src={`${backgroundImage}`}
          alt=""
        />
        <h3 className="absolute text-1xl lg:text-2xl text-white top-5 left-5">
          24/7 Customer Service +91 7850601212
        </h3>
        <h3 className="absolute text-1xl lg:text-2xl top-24 left-[65%] text-white">
          steps 1 out of 4
        </h3>
        <div className="sm:w-1/2 lg:w-1/3">
          <h1 className="absolute text-2xl md:text-3xl lg:text-4xl top-32 left-[40%] xl:left-[45%] text-white">
            Check Availability
          </h1>
          <h2 className="absolute text-1xl lg:text-xl top-[32%] left-[29%] lg:left-[29%] xl:left-[36%] text-white">
            Your ZIP/Postal code is required to check availability in your area
          </h2>
          <input
            id="pin"
            name="pin"
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="absolute rounded-full text-5xl top-[50%] lg:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 sm:text-4xl sm:top-[50%] sm:left-1/2  w-32 sm:w-80 lg:w-1/5 h-14"
          />
          {error && !pinRegex.test(pin) && (
            <span className="mt-1 text-red-500 text-2xl font-medium block absolute top-[56%] left-[41%]">
              Please enter a valid pincode !
            </span>
          )}
          {serverError && (
            <span className="absolute mt-3 top-[36%] left-[36%] text-yellow-500 text-2xl font-medium block ml-0">
              {message}
            </span>
          )}
          <button
            className="absolute top-[255px] left-[67%] text-2xl bg-blue-500 px-2 py-2 rounded-md text-white sm:text-4xl w-14 h-12 sm:w-28 md:w-14 lg:w-14 md:text-3xl lg:text-3xl md:left-[70.5%] lg:left-[60.5%] lg:top-[255px]"
            type="button"
            onClick={handleSubmit}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Check_Availability;
