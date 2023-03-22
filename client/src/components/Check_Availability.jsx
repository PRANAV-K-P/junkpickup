import React, { useState } from "react";
import backgroundImage from "../../src/assets/images/commonbackground.jpg";

const Check_Availability = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const pinRegex = /^\d{6}$/;

  const handleSubmit = () => {
    try {
      if (!pinRegex.test(pin)) {
        setError(true);
        return false;
      }
    } catch (err) {}
    console.log(pin);
  };

  return (
    <div className="bg-green-300 w-full h-3/6 ">
      <div className="relative">
        <img className="w-full h-[550px]" src={`${backgroundImage}`} alt="" />
        <h3 className="absolute text-2xl text-white top-5 left-5">
          24/7 Customer Service +91 7850601212
        </h3>
        <h3 className="absolute text-2xl top-24 left-[65%] text-white">
          steps 1 out of 4
        </h3>
        <div className="">
          <h1 className="absolute text-4xl top-36 left-[41.5%] text-white">
            Check Availability
          </h1>
          <h2 className="absolute text-2xl top-48 left-[32%] text-white">
            Your ZIP/Postal code is required to check availability in your area
          </h2>
          <input
            id="pin"
            name="pin"
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="absolute rounded-full text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          />
          {error && !pinRegex.test(pin) && (
            <span className="mt-1 text-red-500 text-2xl font-medium block absolute top-[56%] left-[41%]">
              Please enter a valid pincode !
            </span>
          )}
          <button
            className="absolute top-[44.2%] left-[67%] text-5xl bg-blue-500 px-2 py-2 rounded-md text-white"
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
