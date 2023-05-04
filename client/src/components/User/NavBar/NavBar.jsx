import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateDate,
  updateTimeId,
  updateItems,
  updateTime,
  updateAddressId,
  updatePincode,
  updateType,
} from "../../../redux/user";

const MainNavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const auth = localStorage.getItem("user");
  const dispatch = useDispatch();

  const logout = () => {
    // localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    dispatch(updateDate(null));
    dispatch(updateTimeId(""));
    dispatch(updateItems([]));
    dispatch(updateTime(""));
    dispatch(updateAddressId(""));
    dispatch(updatePincode(""));
    dispatch(updateType(""));
    navigate("/");
  };
  return (
    <header className="border-none py-6 shadow-xl">
      <div className="flex item-center justify-between xl:max-w-11xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full ">
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
          } w-full lg:flex lg:items-center lg:w-auto `}
        >
          <ul className="text-base text-gray-700 lg:flex lg:justify-between">
            <li className="group">
              <span className="lg:px-5 py-2 block hover:text-blue-700 font-bold">
                Services
              </span>
              <div className="hidden z-50 group-hover:block  border border-black h-32 hover:block lg:top-15 lg:absolute w-32 top-30 bg-slate-50 shadow-xl px-2 py-3">
                <ul className=" font-semibold w-full">
                  <li className=" text-lg w-full py-2 ">
                    <Link className="block" to="/check-pincode">
                      JunkPickup
                    </Link>
                  </li>
                  <hr className="" />
                  <li className="block text-lg w-full  py-2">
                    <Link className="" to="/recycle">
                      Recycle
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                to="/faq"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                to="/connect"
              >
                Connect
              </Link>
            </li>
            <li>
              <Link
                className="lg:px-5 py-2 block hover:text-blue-700 font-bold"
                to="/about"
              >
                About
              </Link>
            </li>
            {auth ? (
              <>
                <li className="group">
                  <span className="lg:px-5 py-2 block hover:text-blue-700 font-bold">
                    <FaUser className="mt-1" />
                  </span>
                  <div className="hidden z-50 group-hover:block  border border-black h-32 hover:block lg:top-15 lg:absolute w-28 top-30 bg-slate-50 shadow-xl px-2 py-3">
                    <ul className=" font-semibold w-full">
                      <li className=" text-lg w-full py-2 ">
                        <Link className="block" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <hr className="" />
                      <li className="block text-lg w-full  py-2">
                        <Link className="block" to="/view-bookings">
                          Bookings
                        </Link>
                      </li>
                    </ul>
                  </div>
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
