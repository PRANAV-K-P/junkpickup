import React, { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import Datepicker from "react-datepicker";
import { parse, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../../src/assets/images/commonbackground.jpg";

function Pick_DateTime() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [allItems, setAllItems] = useState([
    { name: "Old furniture", count: 0 },
    { name: "Appliances", count: 0 },
    { name: "Electronics", count: 0 },
    { name: "Clothing", count: 0 },
    { name: "Toys", count: 0 },
    // Add more items here as needed
  ]);
  const [times, setTimes] = useState(["9", "10", "12", "3", "5", "6"]);

  console.log(selectedDate, "------ date");
  console.log(selectedItems, "=== selectedItems");

  useEffect(() => {
    
  },[])

  const handleItemSelect = (item) => {
    if (!selectedItems.some((i) => i.name === item.name)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleItemRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  const handleDateSelect = (item) => {

  }

  return (
    <div className="relative w-full h-[650px] bg-violet-500 flex flex-col justify-end ">
      <img
        className="absolute w-full h-[650px] z-0 object-cover"
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <h2 className="relative text-white font-semibold ml-[999px] mb-10 text-xl">
        step 2 out of 4
      </h2>
      <div className="relative bg-white  z-10 w-full h-[520px]">
        <div className="ml-72 mt-7 bg-white h-full">
          <div className="flex items-center bg-white-400 mb-4">
            <FaArrowCircleRight className="text-blue-600 mr-4 text-2xl" />{" "}
            <span className="text-2xl">
              Select the items you would like removed
            </span>
          </div>
          <div className="flex items-center bg-white border p-3 border-gray-400 shadow-xl w-3/5 mb-4">
            {allItems.map((item) => (
              <div key={item.name} className="items-center w-full sm:w-auto">
                <button
                  className={`${
                    selectedItems.some((i) => i.name === item.name)
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
          {selectedItems.length > 0 && (
            <div className="border border-gray-300 w-3/5 bg-white shadow-xl rounded-lg py-2 pl-2 mb-4 flex flex-wrap">
              {selectedItems.map((item) => (
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
          <div className="flex items-center bg-white mb-4">
            <FaArrowCircleRight className="text-blue-600 mr-4 text-2xl" />{" "}
            <span className="text-2xl">Date and Time</span>
          </div>
          <div className="bg-white border w-3/5 flex flex-row ">
            <Datepicker
              className="border"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              dateFormat="dd/MM/yyyy"
              minDate={new Date(Date.now() + 86400000)}
              showYearDropdown
              scrollableMonthYearDropdown
              inline
            />
            <div className="bg-red-300 w-2/4 ml-32">
              <div className="text-xl bg-gray-300 font-bold flex items-center justify-center ">
                FRIDAY,JANUARY 6
              </div>
              <div className="flex flex-row px-6 py-4">
                {times.map((item) => (
                  <div
                    key={item?.time}
                    className="flex h-20 py-5 justify-center sm:w-auto bg-white"
                  >
                    <button
                      className={`${
                        selectedTime.some((i) => i.id === item.id)
                          ? "bg-blue-500 text-white "
                          : "bg-white text-gray-700"
                      } shadow-xl border border-gray-200 px-4 py-2 text-sm w-full sm:w-auto mr-2`}
                      onClick={() => handleDateSelect(item)}
                    >
                      {item.time}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pick_DateTime;
