import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import backgroundImage from "../../../assets/images/commonbackground.jpg";
import { MdLocationOn } from "react-icons/md";

const Recycle = () => {
  const [centers, setCenters] = useState([]);

  const RECYCLE_URL = "/recycling-centers/details";
  useEffect(() => {
    getCenters();
  }, []);

  const getCenters = async () => {
    try {
      let response = await axiosInstance.get(RECYCLE_URL, {
        headers: {
          Authorization: `Bpickj ${JSON.parse(
            localStorage.getItem("adminToken")
          )}`,
        },
      });
      if (response.data) {
        setCenters(response.data);
      }
    } catch (err) {}
  };

  const handleSearch = async (event) => {
    const key = event.target.value;
    if (key) {
      const SEARCH = `/recycling-centers/search/${key}`;
      let response = await axiosInstance.get(SEARCH);
      if (response.data) {
        setCenters(response.data);
      }
    } else {
      getCenters();
    }
  };

  return (
    <div className=" w-full min-h-screen">
      <div className="relative flex h-32 bg-red-600">
        <img
          className="w-full sm:max-w-full"
          src={`${backgroundImage}`}
          alt=""
        />
        <div className=" absolute sm:w-1/2 lg:w-2/3 top-[12%] mt-1 border rounded-full border-white lg:pl-52">
          <h2 className=" text-1xl lg:text-2xl text-white font-medium">
            Filter Recycling centers.
          </h2>
          <input
            type="text"
            onChange={handleSearch}
            className="mt-2 rounded-full text-5xl sm:text-4xl w-32 mr-3 sm:w-2.4 lg:w-2/4 h-10"
          />
        </div>
      </div>
      <div className="w-full min-h-screen bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 pt-10 pb-4 flex flex-col items-center  ">
        {centers.length === 0 && (
          <div className="text-white text-4xl border border-white w-3/4">
            * Items Not Found
          </div>
        )}
        {centers.map((element, index) => (
          <div
            key={index}
            class="grid grid-rows-3 grid-flow-col grid-cols-7 gap-2 mb-3 max-w-2xl bg-gradient-to-r from-emerald-200 to-lime-500 p-2"
          >
            <div class="row-span-3 col-span-2 bg-teal-400 ">
              <img
                className="w-full h-full"
                src={`${element.imageUrl}`}
                alt=""
              />
            </div>
            <div class="row-span-1 col-span-7 flex flex-row border border-gray-300 shadow-lg text-xl">
              <div className="font-semibold text-2xl">{element.name}</div>
            </div>
            <div class="row-span-1 col-span-7 flex flex-row border border-gray-300 shadow-lg text-xl ">
              <div className="mr-3 text-lg">
                <MdLocationOn className="text-xl" />
              </div>
              <div className="mr-3 text-lg">{element.city}</div>
              <div className="text-lg">{element.pincode}</div>
            </div>
            <div class="row-span-1 col-span-7 flex flex-row border border-gray-300 shadow-lg text-xl">
              <div className="text-lg font-semibold">
                <span>Since: </span>
                <span>{element.startedYear}</span>
              </div>
              <div className="text-lg font-semibold">
                , <span>head office: </span>
                <span>{element.headOffice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recycle;
