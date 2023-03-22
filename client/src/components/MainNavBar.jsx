import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainNavBar = () => {
  const [open, setOpen] = useState(false);
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
  };
  return (
    <header className="border-none py-6 shadow-xl">
      <div className="flex item-center justify-between xl:max-w-11xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
        <h1 className="text-5xl font-bold text-dark-red w-70">
          <Link to="/">JunkPickup</Link>
        </h1>

        <FiMenu
          className="lg:hidden block  h-6 w-6 cursor-pointer mt-3"
          onClick={() => setOpen(!open)}
        />

        <nav
          className={`${
            open ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="text-base text-gray-700 lg:flex lg:justify-between">
            <li className="group">
              <Link
                className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                to=""
              >
                Services
              </Link>
              <div className="hidden group-hover:block hover:block lg:top-15 lg:absolute w-24 top-30 bg-slate-50 shadow-xl px-2 py-3">
                <ul className="opacity-50 font-semibold ">
                  <li className=" opacity-100">
                    <Link className="block" to="/j-pincode">
                      JunkPickup
                    </Link>
                  </li>
                  <li className="block">
                    <Link className="" to="">
                      Recycle
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link
                className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                to=""
              >
                Locations
              </Link>
            </li>
            <li>
              <Link
                className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                to=""
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                to=""
              >
                Connect
              </Link>
            </li>
            {auth ? (
              <>
                <li>
                  <Link
                    className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                    to="/profile"
                  >
                    <FaUser className="mt-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                    onClick={logout}
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div
          className={`${
            open ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:w-auto`}
        ></div>
      </div>
    </header>
  );
};

export default MainNavBar;
