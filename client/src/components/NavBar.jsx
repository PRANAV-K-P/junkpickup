import React from "react";
import { Link, useLocation } from "react-router-dom";
import MainNavBar from "./MainNavBar";

const NavBar = () => {
  const location = useLocation();
  if (location.pathname !== "/signup" && location.pathname !== "/login") {
    return <MainNavBar />;
  } else {
    return (
      <div className="bg-white pt-11 shadow-xl">
        <div className="text-red-500 bg-red-100 h-24 pt-3">
          <h1 className="text-5xl w-full font-bold ml-32 text-dark-red">
            <Link to="/">JunkPickup</Link>
          </h1>
          {location.pathname === "/signup" && (
            <h3 className="ml-72 text-green-500 font-bold text-2xl">
              <Link to="/login">Login</Link>
            </h3>
          )}
          {location.pathname === "/login" && (
            <h3 className="ml-72 text-green-500 font-bold text-2xl">
              <Link to="/signup">Signup</Link>
            </h3>
          )}
        </div>
      </div>
    );
  }
};

export default NavBar;
