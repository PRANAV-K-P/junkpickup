import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AdminAddItems = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState("");
  const regex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const URL = "/items";
      if (!regex.test(name) || !regex.test(description)) {
        setError(true);
        return false;
      }

      let response = await axiosInstance.post(
        URL,
        { name, description },
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
          title: "Data successfully added",
          showConfirmButton: false,
          timer: 1500,
        });
        setName("");
        setDescription("");
        setError(false);
      }
    } catch (err) {
      setServerError(true);
      setMessage(err.response.data.message);
    }
  };
  return (
    <div className="bg-sky-blue w-full min-h-full  flex justify-center items-center ">
      <div className="bg-white w-4/5 h-5/6 ">
        <h1 className="text-2xl mt-10 font-bold flex items-center justify-center">Add Items</h1>
        <div className="block max-w-md rounded-lg p-6 shadow-xl bg-white ml-auto mr-auto mt-12">
          {serverError && (
            <span className="mt-1 p-2 text-white bg-red-500 font-medium block ml-0 mb-5">
              {message}
            </span>
          )}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer block min-h-[auto] w-full rounded border placeholder-black border-black bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
              placeholder="Enter item name"
            />
            {error && !regex.test(name) && (
              <span className="mt-1 text-red-500 font-medium block ml-0">
                *Invalid name.
              </span>
            )}
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="peer block min-h-[auto] w-full rounded border placeholder-black border-black bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
              rows="3"
              placeholder="Enter item description"
            ></textarea>
            {error && !regex.test(description) && (
              <span className="mt-1 text-red-500 font-medium block ml-0">
                *Invalid Description.
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
      </div>
    </div>
  );
};

export default AdminAddItems;
