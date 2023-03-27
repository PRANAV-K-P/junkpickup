import React, { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import Datepicker from 'flowbite-datepicker/Datepicker';
import backgroundImage from "../../src/assets/images/commonbackground.jpg";

function Pick_DateTime() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [allItems, setAllItems] = useState([
    { name: "Old furniture", count: 0 },
    { name: "Appliances", count: 0 },
    { name: "Electronics", count: 0 },
    { name: "Clothing", count: 0 },
    { name: "Toys", count: 0 },
    // Add more items here as needed
  ]);

  const handleItemSelect = (item) => {
    if (!selectedItems.some((i) => i.name === item.name)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleItemRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <div className="relative w-full h-[650px] bg-violet-500 flex flex-col justify-end ">
      <img
        class="absolute w-full h-full z-0 object-cover"
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <h2 className="relative text-white font-semibold ml-[999px] mb-10 text-xl">step 2 out of 4</h2>
      <div className="relative bg-white  z-10 w-full h-[520px]">
        <div className="ml-72 mt-7 bg-white w-full h-full">
          <div className="flex items-center bg-white-400 mb-4">
            <FaArrowCircleRight className="text-blue-600 mr-4 text-2xl" />{" "}
            <span className="text-2xl">
              Select the items you would like removed
            </span>
          </div>
          <div className="flex items-center bg-white border p-3 border-gray-400 shadow-xl w-3/5 mb-4">
            {allItems.map((item) => (
              <div
                key={item.name}
                className="items-center w-full sm:w-auto"
              >
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
            <div className="border border-gray-300 w-3/5 bg-white shadow-xl rounded-lg p-2 mb-4 flex flex-wrap">
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
          <div className="bg-white w-full">
            date picker
            </div>
        </div>
      </div>
    </div>
  );
}

export default Pick_DateTime;
