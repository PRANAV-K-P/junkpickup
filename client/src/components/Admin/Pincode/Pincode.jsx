import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../api/axiosInstance';

const Pincode = () => {
    const [pin, setPin] = useState("");
    const [pincodes, setPincodes] = useState([]);
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [message, setMessage] = useState("");

    const pinRegex = /^\d{6}$/;

    const handleSubmit = async () => {
        try {
          if (!pinRegex.test(pin) ) {
            setError(true);
            return false;
          }
          let response = await axiosInstance.post('/pincode',{ pin },
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
              title: "Pincode successfully added",
              showConfirmButton: false,
              timer: 1500,
            });
            setPin("");
            setError(false);
            setStatus(true);
          }
        } catch (err) {
          setServerError(true);
          setMessage(err.response.data.message);
        }
      };

      const getPincodes = async () => {
        try {
            let response = await axiosInstance.get('/pincode',{
                headers: {
                    Authorization: `Bpickj ${JSON.parse(
                      localStorage.getItem("adminToken")
                    )}`,
                  },
            });
            if(response.data) {
                setPincodes(response.data);
                setStatus(false);
            }
        } catch (err) {}
      }
      useEffect(() => {
        getPincodes();
      }, [status])

      const handleDelete = (pinId, pin) => {
        Swal.fire({
          title: `Do you want to delete ${pin}`,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              let response = await axiosInstance.delete(`/pincode/${pinId}`, {
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
                  title: "Pincode successfully deleted ",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setStatus(true);
              }
            } catch (err) {}
          }
        });
      }

  return (
    <div className="bg-sky-blue w-full min-h-screen  flex justify-center items-center ">
      <div className="bg-white w-4/5 ">
        <h1 className="text-2xl mt-1 font-bold flex items-center justify-center">Add Pincode</h1>
        <div className="block max-w-md rounded-lg p-6 shadow-xl bg-gray-50 ml-auto mr-auto mt-2">
          {serverError && (
            <span className="mt-1 p-2 text-white bg-red-500 font-medium block ml-0 mb-5">
              {message}
            </span>
          )}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="peer bg-white block min-h-[auto] w-full rounded border placeholder-black border-black bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
              placeholder="Enter item name"
            />
            {error && !pinRegex.test(pin) && (
              <span className="mt-1 text-red-500 font-medium block ml-0">
                *Invalid name.
              </span>
            )}
          </div>

          <button
            type="button"
            className="shadow-xl inline-block bg-blue-400 w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-500-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className='w-2/4 bg-white mb-3 mt-5 p-5'>

        <table className="w-full text-sm text-left text-black dark:text-black">
              <thead className="text-lg text-black uppercase bg-gray-100 dark:bg-gray-100 dark:text-black">
                <tr>
                  <th scope="col" className="p-4">
                    Sl.no
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pincode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pincodes.map((item, index) => (
                  <tr
                    key={item.name}
                    className="bg-gray-100 border-b dark:bg-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-white"
                  >
                    <td className="w-4 p-4 text-lg">{index + 1}</td>
                    <td className="px-6 py-4 text-lg"> {item.pin}</td>

                    <td className="px-6 py-4 flex justify-center items-center">
                      
                    <button
                        onClick={() => handleDelete(item._id, item.pin)}
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
  )
}

export default Pincode