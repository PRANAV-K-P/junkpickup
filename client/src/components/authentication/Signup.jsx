import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LoginBackgroundImage from "../../assets/images/login_background.jpg";

const SIGNUP_URL = "/users/signup";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [regexError, setRegexError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const nameRegex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const emailRegex = /^\s*([a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3})\s*$/i;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;

  const handleSubmit = async () => {
    try {
      if (!name || !email || !phone || !password || !confirmPassword) {
        setError(true);
        return false;
      }

      let response = await axiosInstance.post(SIGNUP_URL, {
        name,
        email,
        phone,
        password,
      });
      if (response.data) {
        navigate("/login");
      }
    } catch (err) {
      setServerError(true);
      setMessage(err.response.data.message);
    }
  };

  const check = () => {
    if (
      !nameRegex.test(name) ||
      !emailRegex.test(email) ||
      !phoneRegex.test(phone) ||
      !passwordRegex.test(password) ||
      password !== confirmPassword
    ) {
      setRegexError(true);
      return false;
    }
    return;
  };
  return (
    <div className="flex justify-center min-h-full w-full ">
      <div className="w-full max-w-4xl bg-red-400 h-4/5 rounded-lg shadow-lg overflow-hidden mt-28 mb-4">
        <div className="flex flex-row">
          <div className="bg-light-blue w-3/5 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
            {serverError && (
              <span className="mt-1 mb-1 p-2 text-white bg-red-500 font-medium block ml-0">
                {message}
              </span>
            )}
            <div className="mb-3">
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={check}
                placeholder="Full name"
                className=" appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-light-blue"
              />
              {error && !name && (
                <span className="mt-1 text-red-500 font-medium block ml-0">
                  *Name cannot be empty.
                </span>
              )}
              {regexError && !nameRegex.test(name) && name && (
                <span className="mt-1 text-yellow-500 font-medium block ml-0">
                  Invalid Name!
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={check}
                placeholder="Email address"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-light-blue"
              />
              {error && !email && (
                <span className="mt-1 text-red-500 font-medium block ml-0">
                  *Email cannot be empty.
                </span>
              )}
              {regexError && !emailRegex.test(email) && email && (
                <span className="mt-1 text-yellow-500 font-medium block ml-0">
                  Invalid email address!
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={check}
                placeholder="Phone number"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-light-blue"
              />
              {error && !phone && (
                <span className="mt-1 text-red-500 font-medium block ml-0">
                  *Phone number cannot be empty.
                </span>
              )}
              {regexError && !phoneRegex.test(phone) && phone && (
                <span className="mt-1 text-yellow-500 font-medium block ml-0">
                  Invalid phone number!
                </span>
              )}
            </div>
            <div className="mb-3 relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={show1 ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={check}
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-light-blue"
              />
              <div className="absolute top-2 right-0 pr-3 flex items-center leading-5">
                {
                  <FaRegEyeSlash
                    onClick={() => setShow1(!show1)}
                    className={`${
                      show1 ? "hidden" : "block"
                    } text-xl cursor-pointer`}
                  />
                }
                {
                  <FaRegEye
                    onClick={() => setShow1(!show1)}
                    className={`${
                      show1 ? "block" : "hidden"
                    } text-xl cursor-pointer`}
                  />
                }
              </div>
              {error && !password && (
                <span className="mt-1 text-red-500 font-medium block ml-0">
                  *Password cannot be empty.
                </span>
              )}
              {regexError && !passwordRegex.test(password) && password && (
                <span className="mt-1 text-yellow-500 font-medium block ml-0">
                  *Must be 6 or more characters & contain at least 1 number & 1
                  special character & 1 lower case & 1 upper case
                </span>
              )}
            </div>
            <div className="mb-3 relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={show2 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={check}
                placeholder="ConfirmPassword"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-light-blue"
              />
              <div className="absolute top-2 right-0 pr-3 flex items-center leading-5">
                {
                  <FaRegEyeSlash
                    onClick={() => setShow2(!show2)}
                    className={`${
                      show2 ? "hidden" : "block"
                    } text-xl cursor-pointer`}
                  />
                }
                {
                  <FaRegEye
                    onClick={() => setShow2(!show2)}
                    className={`${
                      show2 ? "block" : "hidden"
                    } text-xl cursor-pointer`}
                  />
                }
              </div>
              {error && !confirmPassword && (
                <span className="mt-1 text-red-500 font-medium block ml-0">
                  *Confirm password cannot be empty.
                </span>
              )}
              {regexError &&
                password !== confirmPassword &&
                confirmPassword && (
                  <span className="mt-1 text-yellow-500 font-medium block ml-0">
                    Please make sure passwords match.
                  </span>
                )}
            </div>
            <div className="w-full flex justify-center">
              <button
                className="bg-yellow-500 self-center hover:bg-yellow-600 rounded-full py-2 px-4 text-white font-bold w-40 mb-4"
                type="button"
                onClick={handleSubmit}
              >
                Signup
              </button>
            </div>
            <div className="text-center">
              <p>
                Already have an account ?{" "}
                <span className="font-bold">
                  <Link to="/login">Login.</Link>
                </span>
              </p>
              <div className="mt-2 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 10c0-.42-.04-.84-.1-1.25H10v2.5h5.57a2.68 2.68 0 0 1-1.16 1.75v1.45h1.88c1.1-1.02 1.74-2.5 1.74-4.15zm-10 2.5v-5h5.55c-.28.63-.77 1.16-1.37 1.5-.6.34-1.28.5-1.98.5-.7 0-1.38-.16-1.98-.5-.6-.34-1.09-.87-1.37-1.5H10v5z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Sign up with Google</p>
              </div>
            </div>
          </div>
          <div className="w-3/5 h-45 bg-red-500">
            <div
              className="h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${LoginBackgroundImage})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
