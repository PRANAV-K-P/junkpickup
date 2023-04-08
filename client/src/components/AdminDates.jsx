import React, { useState, useId } from "react";
import { useNavigate } from 'react-router-dom'
import Datepicker from "react-datepicker";
import axiosInstance from "../api/axiosInstance";

const AdminDates = () => {
  const DATES_URL = "/admin/dates";

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [timeSlots, setTimeSlots] = useState([
    { id: useId(), time: "9 AM", status: false },
    { id: useId(), time: "10 AM", status: false },
    { id: useId(), time: "11 AM", status: false },
    { id: useId(), time: "12 PM", status: false },
    { id: useId(), time: "2 PM", status: false },
    { id: useId(), time: "3 PM", status: false },
    { id: useId(), time: "4 PM", status: false },
    { id: useId(), time: "5 PM", status: false },
  ]);
  

  const handleItemSelect = (item) => {
    if (!selectedTime.some((i) => i.time === item.time)) {
      item.status = true;
      setSelectedTime([...selectedTime, item]);
    } else {
      item.status = false;
      setSelectedTime(
        selectedTime.filter((obj) => {
          if (obj.status === item.status) {
            return null;
          } else {
            return obj;
          }
        })
      );
    }
  };
  const handleSubmit = async () => {
    try {
      if (!selectedDate) {
        setError(true);
        setMessage("Date cannot be Empty");
        return false;
      } else if (selectedTime.length === 0) {
        setError(true);
        setMessage("Please select any time slot");
        return false;
      }
      setError(false);
      console.log("selectedDate = ", selectedDate);
      console.log(selectedTime, "--- selectedTime ");
      // console.log("okok");
      console.log("axios");
      let response = await axiosInstance.post(
        DATES_URL,
        { date: selectedDate, timeSlot: selectedTime },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            userId: JSON.parse(localStorage.getItem("admin"))._id
          },
        }
      );
      if (response) {
        console.log(response,"--response");
        const ISODate = new Date(response.data.date);
        const date = ISODate.toDateString();  
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Data added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        // navigate(0) 
        setSelectedDate(null);
        setSelectedTime([]);
        selectedTime.forEach(slot => slot.status = false );
      }
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message);
      console.log(err,"-- err");
    }
  };

  return (
    <div className="bg-sky-blue w-full min-h-full  flex justify-center items-center ">
      <div className="bg-white w-4/5 ">
        <div className=" bg-red-300 h-16 text-2xl font-bold flex items-center justify-center">
          Dates
        </div>
        {error && (
          <span className="mt-1 mb-1 p-1 text-white bg-red-500 text-2xl font-medium block ml-0">
            {message}
          </span>
        )}
        <h1 className="text-xl font-semibold mt-10 ml-10">
          Select Date and Time
        </h1>
        <div className="relative border mt-7 ml-10 h-96 ">
          <Datepicker
            className="border border-gray-500  float-left"
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
            }}
            dateFormat="dd/MM/yyyy"
            minDate={new Date(Date.now() + 86400000)}
            //  filterDate={(date) => date.getDay() != 6}
            showYearDropdown
            scrollableMonthYearDropdown
          />
          <div className="absolute border bg-white shadow-xl h-64 left-96 p-3 flex flex-row">
            {timeSlots.map((item) => (
              <div
                key={item.time}
                className="flex h-20 py-5 justify-center sm:w-auto bg-white"
              >
                <button
                  className={`${
                    selectedTime.some((i) => i.id === item.id)
                      ? "bg-blue-500 text-white "
                      : "bg-white text-gray-700"
                  } shadow-xl border border-gray-200 px-4 py-2 text-sm w-full sm:w-auto mr-2`}
                  onClick={() => handleItemSelect(item)}
                >
                  {item.time}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          className="w-184 h-43 bg-button-blue text-white px-2 py-2 w-20  mb-12  mt-2 ml-10"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminDates;
