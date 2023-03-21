import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginBackgroundImage from "../assets/images/login_background.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const emailRegex = /^\s*([a-z0-9]+@[a-z]+\.[a-z]{2,3})\s*$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const collectData = () => {
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      setError(true);
      return false;
    } else {
      console.log(email, password);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-white ">
      <div className="w-full max-w-4xl bg-red-400 h-4/5 rounded-lg shadow-lg overflow-hidden mt-5 mb-4">
        <div className="flex flex-row">
          <div className="bg-light-blue w-3/5 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold mb-5 text-center">Signin</h2>
            <form>
              <div className="mb-3 mt-9">
                <label htmlFor="firstName" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-light-blue"
                />
                {error && !emailRegex.test(email) && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    Please enter a valid email address.
                  </span>
                )}
              </div>
              <div className="mb-10">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-light-blue"
                />
                {error && !passwordRegex.test(password) && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    Please enter a valid password.
                  </span>
                )}
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="bg-yellow-500 self-center hover:bg-yellow-600 rounded-full py-2 px-4 text-white font-bold w-40 mb-4"
                  type="button"
                  onClick={collectData}
                >
                  Signin
                </button>
              </div>
            </form>
            <div className="text-center">
              <p>
                Don't have an account?{" "}
                <span className="font-bold">
                  <Link to="/signup">Join now.</Link>
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
                <p>Log in with Google</p>
              </div>
            </div>
          </div>
          <div className="w-4/5 h-45 bg-red-500">
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

export default Login;
