import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import axiosInstance from "../api/axiosInstance";
import Address from "../components/Address";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState(false);

  const nameRegex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const emailRegex = /^\s*([a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3})\s*$/i;
  const phoneRegex = /^\d{10}$/;

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const PROFILE = `/users/profiles/${userId}`;

  const handleSubmit = async () => {
    try {
      if (
        !nameRegex.test(name) ||
        !emailRegex.test(email) ||
        !phoneRegex.test(phone)
      ) {
        setError(true);
        return false;
      }
      let response = await axiosInstance.put(
        PROFILE,
        {
          name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
        }
      );
      if (response.data) {
        console.log(response.data);
      }
    } catch (e) {
      setServerError(true);
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let response = await axiosInstance.get(PROFILE, {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
        });
        if (response.data) {
          console.log(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
        }
      } catch (err) {
        setServerError(true);
        setMessage(err.response.data.message);
      }
    })();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6 md:p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-3">
              <div className="mb-6 lg:w-2/4">
                <h2 className="text-xl font-medium mb-4">Profile</h2>
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
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-gray-400 border rounded-md p-2"
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
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-gray-400 border rounded-md p-2"
                    required
                  />
                  {error && !emailRegex.test(email) && (
                    <span className="mt-1 text-red-500 font-medium block ml-0">
                      Please enter a valid email address.
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="mobileNo"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Mobile No
                  </label>
                  <input
                    type="tel"
                    id="mobileNo"
                    name="mobileNo"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-gray-400 border rounded-md p-2"
                    required
                  />
                  {error && !phoneRegex.test(phone) && (
                    <span className="mt-1 text-red-500 font-medium block ml-0">
                      Please enter a valid 10 digit mobile number.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2 mt-4"
                >
                  Save
                </button>
              </div>
            </div>
            <Address />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
