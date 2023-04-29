import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Upload from "./Upload";
import { updateStatus } from "../../../redux/admin";
import axiosInstance from "../../../api/axiosInstance";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const { status } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const BANNER = "/banners";
      try {
        let response = await axiosInstance.get(BANNER, {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("adminToken")
            )}`,
          },
        });
        if (response.data) {
          setBanner(response.data);
          dispatch(updateStatus(false));
         
        }
      } catch (err) {}
    })();
  }, [status]);

  const handleDelete = async (id) => {
    const URL=`/banners/${id}` ;
    Swal.fire({
      title: "Do you want to delete the banner",
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
          })
          if(response.data) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "successfully deleted banner",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(updateStatus(true));
          }
        } catch (err) {
    
        }
      }
    })

  }
  return (
    <div className="bg-sky-blue w-full min-h-full  flex justify-center ">
      <div className=" w-4/5 p-3">
        <Upload />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <div className="py-4 bg-white shadow-md">
            <table className="w-full text-sm text-left text-black dark:text-black border border-black">
              <thead className="text-xs text-black uppercase bg-white dark:text-black">
                <tr className="grid grid-cols-5">
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-1"
                  >
                    Sl.no
                  </th>
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-3"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-1"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {banner.map((element, index) => (
                  <tr className="grid grid-cols-5 border border-black">
                    <td className="col-span-1  text-lg font-bold items-center flex justify-center">{index + 1}</td>
                    <td className="col-span-3  flex justify-center">
                      <img
                        width={400}
                        height={10}
                        src={`${element.imageUrl}`}
                      />
                    </td>
                    <td className="col-span-1 bg-blue-400 flex justify-center items-center">
                      <button onClick={() => handleDelete(element._id)} className="bg-red-500 font-semibold w-32 text-lg h-8 rounded-full text-white">
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

export default Banner;
