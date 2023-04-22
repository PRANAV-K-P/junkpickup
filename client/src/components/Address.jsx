import React, { useEffect, useState } from "react";
// import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import axiosInstance from "../api/axiosInstance";

const Address = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const nameRegex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const addressRegex = /^\S[a-zA-Z0-9]*(\s[a-zA-Z0-9]+)*\S$/;
  const pinRegex = /^\d{6}$/;
  const cityRegex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^\s*([a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3})\s*$/i;

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const ADDRESS = `/users/addresses/${userId}`;
  const URL = "/users/addresses";

  // const handleAddAddress = (address) => {
  //   setAddresses([...addresses, address]);
  //   setIsAddAddressModalOpen(false);
  // };

  const closeModal = () => {
    setIsAddAddressModalOpen(false);
    setName("");
    setAddress("");
    setPincode("");
    setCity("");
    setMobile("");
    setEmail("");
    setError(false);
  };

  useEffect(() => {
    (async () => {
      try {
        let response = await axiosInstance.get(URL, {
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
          setAddresses(response.data);
          setStatus(false);
        }
      } catch (e) {}
    })();
  }, [status]);

  const handleSubmit = async () => {
    try {
      if (
        !nameRegex.test(name) ||
        !addressRegex.test(address) ||
        !pinRegex.test(pincode) ||
        !cityRegex.test(city) ||
        !phoneRegex.test(mobile) | !emailRegex.test(email)
      ) {
        setError(true);
        return false;
      }
      let response = await axiosInstance.put(
        ADDRESS,
        { name, address, pincode, city, mobile, email },
        {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
        }
      );
      if (response.data) {
        setStatus(true);
      }
      setName("");
      setAddress("");
      setPincode("");
      setCity("");
      setMobile("");
      setEmail("");
      setIsAddAddressModalOpen(false);
    } catch (e) {
      setServerError(true);
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4">Addresses</h2>
          {addresses.length > 0 ? (
            <ul className="flex flex-row">
              {addresses.map((address, index) => (
                <li
                  key={index}
                  className="flex items-center py-3 bg-white mr-2 px-5 shadow-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mr-3">
                    <FaUserCircle
                      size={24}
                      className="text-gray-500 mx-auto my-auto"
                    />
                  </div>
                  <div className="">
                    <div className="">
                      <MdOutlineEditNote size={30} className="ml-auto cursor-pointer" />
                    </div>

                    <h3 className="text-lg font-medium">{address.name}</h3>
                    <p className="text-gray-700 border border-gray-200 bg-gray-100 rounded-lg mb-2">
                      {address.address}
                    </p>
                    <p className="text-gray-700 border border-gray-200 bg-gray-100 rounded-lg mb-2">
                      {address.pincode}
                    </p>
                    <p className="text-gray-700 border border-gray-200 bg-gray-100 rounded-lg mb-2">
                      {address.city}
                    </p>
                    <p className="text-gray-700 border border-gray-200 bg-gray-100 rounded-lg mb-2">
                      {address.mobile}
                    </p>
                    <p className="text-gray-700 border border-gray-200 bg-gray-100 rounded-lg mb-2">
                      {address.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No addresses added yet.</p>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2 mt-4"
            onClick={() => setIsAddAddressModalOpen(true)}
          >
            Add Address
          </button>

          {isAddAddressModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="relative bg-white w-full sm:w-96 mx-4 rounded shadow-xl border border-gray-300">
                  <button
                    className="absolute top-0 right-0 m-3 text-gray-600"
                    onClick={closeModal}
                  >
                    <MdClose size={20} />
                  </button>
                  <div className="p-6">
                    <h2 className="text-lg font-medium mb-4">Add Address</h2>
                    {serverError && (
                      <span className="mt-1 mb-1 p-2 text-white bg-red-500 font-medium block ml-0">
                        {message}
                      </span>
                    )}
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
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      {error && !nameRegex.test(name) && (
                        <span className="mt-1 text-red-500 font-medium block ml-0">
                          Please enter a valid Name.
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                      {error && !addressRegex.test(address) && (
                        <span className="mt-1 text-red-500 font-medium block ml-0">
                          Please enter a valid Address.
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
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                      />
                      {error && !pinRegex.test(pincode) && (
                        <span className="mt-1 text-red-500 font-medium block ml-0">
                          Please enter a valid Pincode.
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="City"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
                        htmlFor="mobile"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Mobile
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                      {error && !phoneRegex.test(mobile) && (
                        <span className="mt-1 text-red-500 font-medium block ml-0">
                          Please enter a valid 10 digit mobile number.
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {error && !emailRegex.test(email) && (
                        <span className="mt-1 text-red-500 font-medium block ml-0">
                          Please enter a valid email address.
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2"
                    >
                      Save
                    </button>
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

export default Address;
