import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import backgroundImage from "../../../assets/images/commonbackground.jpg";
import axiosInstance from "../../../api/axiosInstance";

const ViewBookings = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getBookings = async () => {
    try {
      const GET_BOOKINGS = "/bookings";
      let response = await axiosInstance.get(GET_BOOKINGS, {
        headers: {
          Authorization: `Bpickj ${JSON.parse(
            localStorage.getItem("userToken")
          )}`,
        },
        params: {
          userId,
        },
      });
      if (response.data) {
        const res = response.data;
        res.map((item) => {
          let formattedDate = new Date(item.date);
          const options = {
            weekday: "short",
            month: "long",
            day: "numeric",
            year: "numeric",
          };
          formattedDate = formattedDate.toLocaleDateString("en-US", options);
          item.date = formattedDate;
        });
        setBookings(res);
        setMessage("see items & more");
        setIsLoading(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleSearch = async (event) => {
    const key = event.target.value;
    if (key) {
      let response = await axiosInstance.get(`/bookings/user/search/${key}`, {
        headers: {
          Authorization: `Bpickj ${JSON.parse(
            localStorage.getItem("userToken")
          )}`,
        },
        params: {
          userId,
        },
      });
      if (response.data) {
        setBookings(response.data);
      }
    } else {
      getBookings();
    }
  };

  return (
    <div className="relative w-full h-[697px] bg-red-400 z-40 flex flex-col bg-no-repeat">
      <img
        className="absolute w-full h-[697px] top-0 object-cover "
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <div className="bg-yellow-500 p-10 w-full min-h-full  flex justify-center items-center ">
        <div className="bg-white w-4/5 h-5/6">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="py-4 bg-gray-100">
              <div className="mb-5">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MdOutlineSearch className="text-black text-xl" />
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    onChange={handleSearch}
                    className="block p-2 pl-10 text-sm text-black border border-white rounded-lg w-80 bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for bookings"
                  />
                </div>
              </div>
              <table
                className={`w-full text-sm text-left text-black dark:text-black border ${
                  isLoading && " border-separate border-spacing-5"
                }`}
              >
                <thead className="text-lg text-black uppercase bg-gray-100 dark:bg-gray-100 dark:text-black ">
                  <tr>
                    <th scope="col" className="p-4">
                      Sl.no
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {isLoading && (
                    <tr>
                      <td>
                        <Skeleton count={3} />
                      </td>
                      <td>
                        <Skeleton count={3} />
                      </td>
                      <td>
                        <Skeleton count={3} />
                      </td>
                      <td>
                        <Skeleton count={3} />
                      </td>
                      <td>
                        <Skeleton count={3} />
                      </td>
                    </tr>
                  )}
                  {bookings.map((item, index) => (
                    <tr
                      key={item._id}
                      className="bg-gray-100 border-b dark:bg-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-white"
                    >
                      <td className="w-4 p-4">{index + 1}</td>
                      <td
                        scope="row"
                        className="flex items-center px-6 py-4 text-black whitespace-nowrap dark:text-black"
                      >
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {item.date}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.time}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/view-bookings/${item._id}`}
                          className="text-blue-500 font-semibold"
                        >
                          {message}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
