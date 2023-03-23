import React, { useState } from "react";
import { RiUserFill } from "react-icons/ri";
import { HiLockClosed, HiEyeOff, HiEye } from "react-icons/hi";
import loginBackground from "../assets/images/adminloginbackground.jpg";

const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const userNameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;

  const handleLogin = () => {
    try {
      if (!userNameRegex.test(userName) || !passwordRegex.test(password)) {
        setError(true);
        return false;
      }
      console.log("ok");
    } catch (e) {}
  };

  return (
    <div className="h-screen w-screen bg-blue-50">
      <div className="mx-auto shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-990 h-422">
        <div className="flex h-full">
          <div className="w-1/2 bg-white h-96 rounded-l-lg">
            <div className="pt-16 px-12">
              <h2 className="text-4xl font-bold text-gray-700 mb-6">Login</h2>
              <p className="text-lg text-gray-500 mb-5">
                Sign in to your account
              </p>
              <div className="relative w-380 h-11 mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <RiUserFill className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  className={`${
                    error &&
                    !userNameRegex.test(userName) &&
                    "border-red-600 border"
                  } w-full h-full pl-12 pr-4 rounded-lg shadow-xl`}
                />
                {error && !userNameRegex.test(userName) && (
                  <span className="relative mt-1 text-red-500 font-medium block ml-0">
                    Please enter a valid username.
                  </span>
                )}
              </div>

              <div className="relative w-380 h-11 mb-8">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <HiLockClosed className="text-gray-400" />
                </div>
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`${
                    error &&
                    !passwordRegex.test(password) &&
                    "border-red-600 border"
                  } w-full h-full pl-12 pr-4 rounded-lg shadow-xl`}
                />
                {error && !passwordRegex.test(password) && (
                  <span className="absolute mt-1 text-red-500 font-medium block ml-0">
                    Please enter a valid password.
                  </span>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <HiEyeOff
                    onClick={() => setShow(!show)}
                    className={`${
                      show ? "hidden" : "block"
                    } text-lg cursor-pointer text-gray-400`}
                  />
                  <HiEye
                    onClick={() => setShow(!show)}
                    className={`${
                      show ? "block" : "hidden"
                    } text-lg cursor-pointer text-gray-400`}
                  />
                </div>
              </div>
              <button
                className="w-184 h-43 bg-black text-white px-2 py-2 w-20  mb-12 mr-12"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
          <div className="w-1/2 bg-gray-100 rounded-r-lg">
            <img
              src={`${loginBackground}`}
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
