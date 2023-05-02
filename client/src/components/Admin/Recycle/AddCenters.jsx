import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { updateStatus, updateRecycleId } from "../../../redux/admin";
import axiosInstance from "../../../api/axiosInstance";

const AddCenters = () => {
  const [isRecycleModalOpen, setIsRecycleModalOpen] = useState();
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [headOffice, setHeadOffice] = useState("");
  const [startedYear, setStartedYear] = useState("");
  const [error, setError] = useState(false);
  const { recycleId } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const nameRegex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const cityRegex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const pinRegex = /^\d{6}$/;
  const officeRegex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const yearRegex = /^\d{4}$/;

  const closeModal = () => {
    setImage("");
    setName("");
    setCity("");
    setPincode("");
    setHeadOffice("");
    setStartedYear("");
    setError(false);
    setIsRecycleModalOpen(false);
    dispatch(updateRecycleId(""));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    (async () => {
      try {
        const RECYCLE_URL = `/recycling-centers/data/${recycleId}`;
        let response = await axiosInstance.get(RECYCLE_URL, {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("adminToken")
            )}`,
          },
        });
        if (response.data) {
          setImageName(response.data.image);
          setName(response.data.name);
          setCity(response.data.city);
          setPincode(response.data.pincode);
          setHeadOffice(response.data.headOffice);
          setStartedYear(response.data.startedYear);
        }
      } catch (err) {}
    })();
  }, [recycleId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !nameRegex.test(name) ||
      !cityRegex.test(city) ||
      !pinRegex.test(pincode) ||
      !officeRegex.test(headOffice) ||
      !yearRegex.test(startedYear)
    ) {
      setError(true);
      return false;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("imageName", imageName);
    formData.append("city", city);
    formData.append("pincode", pincode);
    formData.append("headOffice", headOffice);
    formData.append("startedYear", startedYear);
    if (recycleId) {
      updateData(formData);
    } else {
      addData(formData);
    }
  };

  const addData = async (formData) => {
    const RECYCLE = "/recycling-centers";
    try {
      let response = await axiosInstance.post(RECYCLE, formData, {
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
          title: "Successfully added recycling center",
          showConfirmButton: false,
          timer: 1500,
        });
        setImage("");
        setName("");
        setCity("");
        setPincode("");
        setHeadOffice("");
        setStartedYear("");
        setError(false);
        dispatch(updateStatus(true));
        setIsRecycleModalOpen(false);
      }
    } catch (err) {}
  };

  const updateData = async (formData) => {
    const URL = `/recycling-centers/${recycleId}`;
    try {
      let response = await axiosInstance.put(URL, formData, {
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
          title: "Successfully Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        setImage("");
        setName("");
        setCity("");
        setPincode("");
        setHeadOffice("");
        setStartedYear("");
        setImageName("");
        setError(false);
        dispatch(updateStatus(true));
        dispatch(updateRecycleId(""));
        setIsRecycleModalOpen(false);
      }
    } catch (err) {}
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-white rounded-lg shadow-md pl-5 py-3">
        <div className="mb-3">
          <h2 className="text-xl font-medium mb-4"> Add Recycling centers</h2>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 w-1/5 py-2 mt-4"
            onClick={() => setIsRecycleModalOpen(true)}
          >
            Add centers
          </button>

          {(isRecycleModalOpen || recycleId) && (
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
                          htmlFor="name"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                          required
                        />
                        {error && !nameRegex.test(name) && (
                          <span className="mt-1 text-red-500 font-medium block ml-0">
                            Please enter a valid name.
                          </span>
                        )}
                      </div>
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
                          required={recycleId ? false : true}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="city"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                          required
                        />
                        {error && !cityRegex.test(city) && (
                          <span className="mt-1 text-red-500 font-medium block ml-0">
                            Please enter a valid city name.
                          </span>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="pincode"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Pincode
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                          required
                        />
                        {error && !pinRegex.test(pincode) && (
                          <span className="mt-1 text-red-500 font-medium block ml-0">
                            Please enter a valid valid pincode.
                          </span>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="headOffice"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Head Office
                        </label>
                        <input
                          type="text"
                          id="headOffice"
                          name="headOffice"
                          value={headOffice}
                          onChange={(e) => setHeadOffice(e.target.value)}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                          required
                        />
                        {error && !officeRegex.test(headOffice) && (
                          <span className="mt-1 text-red-500 font-medium block ml-0">
                            Please enter a valid name.
                          </span>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="startedYear"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Started Year
                        </label>
                        <input
                          type="text"
                          id="startedYear"
                          name="startedYear"
                          value={startedYear}
                          onChange={(e) => setStartedYear(e.target.value)}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                          required
                        />
                        {error && !yearRegex.test(startedYear) && (
                          <span className="mt-1 text-red-500 font-medium block ml-0">
                            Please enter a valid year.
                          </span>
                        )}
                      </div>
                      <div className="flex justify-center mt-12">
                        <button
                          type="submit"
                          className="bg-blue-500 w-1/3 hover:bg-blue-600 text-white font-medium rounded px-4 py-2"
                        >
                          {recycleId ? "update" : "save"}
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

export default AddCenters;
