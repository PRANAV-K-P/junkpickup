import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { updateStatus } from "../../../redux/admin";
import axiosInstance from "../../../api/axiosInstance";

const Upload = () => {
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsAddAddressModalOpen(false);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const BANNER = "/banners";
    const formData = new FormData();
    formData.append("image", image);
    try {
      let response = await axiosInstance.post(BANNER, formData, {
        headers: {
          Authorization: `Bpickj ${JSON.parse(
            localStorage.getItem("adminToken")
          )}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully banner created",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(updateStatus(true));
        setIsAddAddressModalOpen(false);
      }
    } catch (err) {
    }
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-white rounded-lg shadow-md pl-5 py-3">
        <div className="mb-3">
          <h2 className="text-xl font-medium mb-4">Select Image</h2>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 w-1/5 py-2 mt-4"
            onClick={() => setIsAddAddressModalOpen(true)}
          >
            Upload Image
          </button>

          {isAddAddressModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="relative bg-white w-2/5 mx-4  rounded shadow-xl border border-gray-300">
                  <button
                    className="absolute top-0 right-0 m-3 text-gray-600"
                    onClick={closeModal}
                  >
                    <MdClose size={20} />
                  </button>
                  <div className="p-6 flex justify-center flex-col">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="image"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Image
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleImageChange}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                          accept="image/*"
                          required
                        />
                      </div>
                      <div className="flex justify-center mt-12">
                        <button
                          type="submit"
                          className="bg-blue-500 w-1/3 hover:bg-blue-600 text-white font-medium rounded px-4 py-2"
                        >
                          upload
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
