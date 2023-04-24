import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowCircleRight } from "react-icons/fa";
import Datepicker from "react-datepicker";
import axiosInstance from "../api/axiosInstance";
import {
  updateDate,
  updateTimeId,
  updateItems,
  updateTime,
} from "../redux/user";
import "react-datepicker/dist/react-datepicker.css";

import backgroundImage from ".././assets/images/commonbackground.jpg";

function Pick_DateTime() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [normalDate, setNormalDate] = useState(null);
  const { items } = useSelector((state) => state.user);
  const { date } = useSelector((state) => state.user);
  const { timeId } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const ITEMS_URL = "/items";
        let response = await axiosInstance.get(ITEMS_URL);
        if (response.data) {
          const itemsArray = response.data;
          setAllItems(itemsArray);
        }
      } catch (err) {}
    })();
  }, []);

  const handleItemSelect = (item) => {
    if (!items.some((i) => i.name === item.name)) {
      dispatch(updateItems([...items, item]));
    }
  };

  const handleItemRemove = (item) => {
    dispatch(updateItems(items.filter((i) => i !== item)));
  };

  useEffect(() => {
    (async () => {
      try {
        const URL = `/datetime/users/${date}`;
        if (date) {
          let response = await axiosInstance.get(URL, {
            headers: {
              Authorization: `Bpickj ${JSON.parse(
                localStorage.getItem("userToken")
              )}`,
            },
          });
          if (response.data) {
            const times = response.data;
            times.forEach((timeObj) => {
              timeObj.status = false;
            });
            setTimeSlots(times);
          }
        }
      } catch (err) {
        setError(true);
        setMessage(err.response.data.message);
      }
    })();
  }, [date]);

  const handleSubmit = () => {
    try {
      if (items.length === 0) {
        setError(true);
        setMessage("Please select any items");
        return false;
      } else if (!date) {
        setError(true);
        setMessage("Please select a date");
        return false;
      } else if (!timeId || !time) {
        setError(true);
        setMessage("Please select a time");
        return false;
      }
      navigate("/address-details");
    } catch (err) {}
  };

  return (
    <div className="relative w-full bg-red-500 flex flex-col justify-end ">
      <img
        className="absolute w-full h-[650px] z-0 top-0 object-cover"
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <h2 className="z-50 text-white font-semibold ml-[55%] top-30 mb-10 mt-6 text-xl">
        step 2 out of 4
      </h2>
      <div className="relative bg-white  z-10 w-full">
        <div className="ml-72 mt-7 bg-white h-full">
          {error && (
            <span className="mt-1 mb-1 p-1 text-white bg-red-500 text-2xl font-medium block ml-0 w-3/4 ">
              {message}
            </span>
          )}
          <div className="flex flex-wrap items-center bg-white-400 mb-4 w-3/4 ">
            <FaArrowCircleRight className="text-blue-600 mr-4 text-2xl" />{" "}
            <span className="text-2xl">
              Select the items you would like removed
            </span>
          </div>
          <div className="flex flex-wrap items-center bg-white border p-3 border-gray-400 shadow-xl w-3/4 mb-4">
            {allItems.map((item) => (
              <div
                key={item.name}
                className="items-center flex w-full sm:w-auto"
              >
                <button
                  className={`${
                    items.some((i) => i.name === item.name)
                      ? "bg-blue-500 text-white "
                      : "bg-white text-gray-700"
                  } border border-gray-300 rounded-lg px-3 py-1 text-sm w-full sm:w-auto mr-2`}
                  onClick={() => handleItemSelect(item)}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
          {items.length > 0 && (
            <div className="border border-gray-300 w-3/4 bg-white shadow-xl rounded-lg py-2 pl-2 mb-4 flex flex-wrap">
              {items.map((item) => (
                <span
                  key={item.name}
                  className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full px-2 py-1 mr-2 mb-2 text-sm"
                >
                  {item.name}
                  <button
                    className="ml-2 font-bold "
                    onClick={() => handleItemRemove(item)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* <div className="bg-white shadow-xl h-8 w-3/5 mb-4">

          </div> */}

          <div className="flex items-center bg-white mb-4 w-3/4">
            <FaArrowCircleRight className="text-blue-600 mr-4 text-2xl" />{" "}
            <span className="text-2xl">Date and Time</span>
          </div>
          <div className="bg-white border w-3/4 flex flex-wrap">
            <div className="mr-20">
              <Datepicker
                className="border"
                selected={normalDate}
                onChange={(date) => {
                  const isoDate = date.toISOString();
                  setNormalDate(date);
                  dispatch(updateDate(isoDate));
                }}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(Date.now() + 86400000)}
                showYearDropdown
                scrollableMonthYearDropdown
                inline
              />
            </div>

            <div className="border sm:w-96 shadow-xl h-64 left-1/3 p-3 flex flex-row flex-wrap">
              {timeSlots.length !== 0 ? (
                timeSlots.map((item) => (
                  <label
                    htmlFor={item.id}
                    className="cursor-pointer flex h-10 justify-center sm:w-auto bg-green-300 mr-4"
                    key={item.time}
                  >
                    <div className="">
                      <div
                        className=" bg-white text-gray-700 shadow-xl border border-gray-200 px-4 py-2 text-sm w-full sm:w-auto "
                        // onClick={() => handleTimeSelect(item)}
                      >
                        <input
                          type="radio"
                          value={item.id}
                          id={item.id}
                          onChange={() => {
                            dispatch(updateTimeId(item.id));
                            dispatch(updateTime(item.time));
                          }}
                          name="Time"
                          className="bg-purple-600"
                        />
                        {item.time}
                      </div>
                    </div>
                  </label>
                ))
              ) : (
                <h2 className="text-2xl">
                  No timeslots available for the selected Day
                </h2>
              )}
            </div>
          </div>
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
  );
}

export default Pick_DateTime;
