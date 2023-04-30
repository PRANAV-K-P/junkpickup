import React from "react";
import backgroundImage from "../../../assets/images/middlebox.jpg";
import { Link } from "react-router-dom";

const Middle = () => {
  return (
    <div
      className={`bg-gradient-to-r from-teal-200 to-lime-200 w-full h-96 flex flex-col items-center justify-center`}
    >
      <div className="relative rounded-xl font-bold text-3xl bg-blue-500 h-36 w-2/5 flex items-center justify-center overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={`${backgroundImage}`}
          alt=""
        />
        <h2 className="absolute bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">YOU GOT JUNK? WE'LL REMOVE IT.</h2>
      </div>
      <div className="relative rounded-xl font-bold text-white flex flex-row items-center justify-around text-3xl  h-36 w-2/5 mt-4 ">
        <div className="bg-blue-500 py-5 flex justify-center w-56 rounded-xl">
          <Link to="/check-pincode">Junk Removal</Link>
        </div>
        <div className="bg-blue-500 py-5 flex justify-center w-56 rounded-xl">
        <Link to="/recycle">Junk Removal</Link>
        </div>
      </div>
    </div>
  );
};

export default Middle;
