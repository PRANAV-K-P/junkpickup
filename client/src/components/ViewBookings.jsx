import React from 'react'
import { MdOutlineSearch } from "react-icons/md";
import backgroundImage from ".././assets/images/commonbackground.jpg";

const ViewBookings = () => {
  return (
    <div className="relative w-full h-[697px] bg-red-400 z-40 flex flex-col bg-no-repeat">
    <img
      className="absolute w-full h-[697px] top-0 object-cover "
      src={`${backgroundImage}`}
      alt="Image"
    ></img>
       <div className="bg-sky-blue w-full min-h-full  flex justify-center items-center ">
      <div className="bg-white w-4/5 h-5/6">
        <h1 className="text-2xl mt-10 font-bold flex items-center justify-center">
          Users
        </h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="py-4 bg-gray-100 dark:bg-gray-100">
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
                  className="block p-2 pl-10 text-sm text-black border border-white rounded-lg w-80 bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for bookings"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left text-black dark:text-black">
              <thead className="text-xs text-black uppercase bg-gray-100 dark:bg-gray-100 dark:text-black">
                <tr>
                  <th scope="col" className="p-4">
                    Sl.no
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ViewBookings