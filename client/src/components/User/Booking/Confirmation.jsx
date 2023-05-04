import React from "react";
import { Link } from "react-router-dom";
import backgroundImage1 from "../../../assets/images/truck.jpg";
import backgroundImage2 from "../../../assets/images/commonbackground.jpg";

const Confirmation = () => {
  return (
    <div className="relative w-full h-[697px] bg-red-400 z-40 flex flex-col bg-no-repeat">
      <img
        className="absolute w-full h-[697px] top-0 object-cover "
        src={`${backgroundImage2}`}
        alt="Image"
      ></img>
      <img
        className="absolute w-full h-[697px] top-0 object-cover opacity-20"
        src={`${backgroundImage1}`}
        alt="Image"
      ></img>
      <div className="relative z-10 w-full">
        <div className="md:col-span-2">
          <div className="ml-2 mr-2 sm:ml-auto sm:mr-auto rounded-lg shadow-2xl mt-20 border border-gray-300 p-2 sm:w-2/4">
            <div className="w-full">
              <div className="text-3xl text-white font-bold mb-3">
                Your booking has been confirmed
              </div>
              <div className="text-xl text-gray-300 font-bold mb-3">
                Thank you for choosing JunkPickup
              </div>
              <div className="text-xl text-yellow-400 font-semibold">
                view your bookings{" "}
                <Link to="/view-bookings" className="text-cyan-300">
                  here
                </Link>
              </div>
            </div>
            <hr className="h-1 my-4 bg-white" />
            <div className="text-xl text-yellow-400 font-bold mb-3">
            This message is a part of our junk pickup scheduling process
            </div>
            <div className="mb-5 text-xl text-white font-semibold flex">
              <div className="mr-3">⁜</div>
              <div>
              We understand that our customers have busy schedules, and we want to make the junk pickup process as convenient as possible
              
              </div>
            </div>
            <div className="mb-5 text-xl text-white font-semibold flex">
              <div className="mr-3">⁜</div>
              <div>
              Once you have scheduled your junk pickup on our website, you can relax knowing that our friendly truck team will call you 15-30 minutes before your promise window to let you know their expected arrival time
              </div>
            </div>
            <div className="mb-5 text-xl text-white font-semibold flex">
              <div className="mr-3">⁜</div>
              <div>
              This way, you can plan your day accordingly and be ready for the pickup without any unnecessary delays.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
