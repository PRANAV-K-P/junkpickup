import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCenters from "./AddCenters";
import { useSelector, useDispatch } from "react-redux";

import { updateStatus, updateRecycleId } from "../../../redux/admin";
import axiosInstance from "../../../api/axiosInstance";

const Recycle = () => {
  
  const [centers, setCenters] = useState([]);
  const { status } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const RECYCLE_URL = "/recycling-centers";

  useEffect(() => {
    (async () => {
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
          dispatch(updateStatus(false));
        }
      } catch (err) {}
    })();
  }, [status]);

  const handleDelete = (recycleId, name) => {
    const URL = `/recycling-centers/${recycleId}`;
    Swal.fire({
      title: `Do you want to delete ${name}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await axiosInstance.delete(URL, {
            headers: {
              Authorization: `Bpickj ${JSON.parse(
                localStorage.getItem("adminToken")
              )}`,
            },
          });
          if (response.data) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "successfully deleted banner",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(updateStatus(true));
          }
        } catch (err) {}
      }
    });
  };

  const openUpdate = (id) => {
    dispatch(updateRecycleId(id));
  };

  return (
    <div className="bg-sky-blue w-full min-h-screen  flex justify-center ">
      <div className=" w-4/5 p-3">
        <AddCenters />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <div className="py-4 bg-white shadow-md">
            <table className="w-full text-sm text-left text-black bg-gray-50 dark:text-black border border-black">
              <thead className="text-xs text-black uppercase dark:text-black">
                <tr className="grid grid-cols-6">
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-1"
                  >
                    Sl.no
                  </th>
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-2 "
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-1 "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-1 "
                  >
                    Details
                  </th>

                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-1 "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {centers.map((element, index) => (
                  <tr
                    key={index}
                    className="grid grid-cols-6 border border-black "
                  >
                    <td className="col-span-1  text-lg font-bold items-center flex justify-center">
                      {index + 1}
                    </td>
                    <td className="col-span-2  flex justify-center">
                      <img
                        width={100}
                        height={100}
                        src={`${element.imageUrl}`}
                      />
                    </td>
                    <td className="col-span-1 text-lg items-center flex justify-center">
                      {element.name}
                    </td>
                    <td className="col-span-1 text-lg flex items-center justify-center">
                      <Link to={`/admin/recycle/${element._id}`} className="text-blue-500 font-semibold">
                        see more details
                      </Link>
                    </td>
                    <td className="col-span-1 flex justify-center items-center">
                      <button
                        onClick={() => openUpdate(element._id)}
                        className="bg-orange-500 font-medium w-28 text-lg h-8 rounded-full text-white"
                      >
                        update
                      </button>
                      <button
                        onClick={() => handleDelete(element._id, element.name)}
                        className="bg-red-500 font-medium w-28 text-lg h-8 rounded-full text-white"
                      >
                        delete
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

export default Recycle;
