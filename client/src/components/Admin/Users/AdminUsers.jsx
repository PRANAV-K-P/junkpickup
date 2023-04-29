import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const FETCH_USERS = "/admin/users";
        let response = await axiosInstance.get(FETCH_USERS, {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("adminToken")
            )}`,
          },
        });
        if (response.data) {
          setUsers(response.data);
          setStatus(false);
        }
      } catch (err) {}
    })();
  }, [status]);

  const handleUserAccess = async (userId, userName, blocked) => {
    try {
      Swal.fire({
        title: `Do you want to ${blocked ? "Unblock" : "block"} ${userName}`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const URL = `/admin/users/${userId}`;
          let response = await axiosInstance.put(
            URL,
            {},
            {
              headers: {
                Authorization: `Bpickj ${JSON.parse(
                  localStorage.getItem("adminToken")
                )}`,
              },
            }
          );
          if (response.data) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: `Successfully ${blocked ? "Unblocked" : "blocked"}`,
              showConfirmButton: false,
              timer: 1500,
            });
            setStatus(true);
          }
        }
      });
    } catch (err) {}
  };

  return (
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
                  placeholder="Search for users"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left text-black dark:text-black">
              <thead className="text-lg text-black uppercase bg-gray-100 dark:bg-gray-100 dark:text-black">
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
              <tbody >
                {users.map((item, index) => (
                  <tr
                    key={item.name}
                    className="bg-gray-100 border-b dark:bg-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-white"
                  >
                    <td className="w-4 p-4 text-lg">{index + 1}</td>
                    <td className="px-6 py-4 text-lg"> {item.name}</td>
                    <td className="px-6 py-4 text-lg">{item.email}</td>
                    <td className="px-6 py-4 text-lg">
                      <div className="flex items-center">
                        <div
                          className={`${
                            item.blocked ? "bg-red-600 " : "bg-green-600 "
                          }h-2.5 w-2.5 rounded-full mr-2`}
                        ></div>
                        {item.blocked ? "Inactive" : "Active"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {/* Modal toggle */}
                      <button
                        onClick={() =>
                          handleUserAccess(item._id, item.name, item.blocked)
                        }
                        className={`${
                          item.blocked ? "bg-green-500 px-4" : "bg-red-500 px-6"
                        } font-semibold rounded-full py-1 text-white`}
                      >
                        {item.blocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
