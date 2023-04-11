import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("admin");

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };
  return (
    <header className="border-none py-6 shadow-xl bg-black">
      <div className="flex item-center justify-between xl:max-w-11xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full ">
        <h1 className="text-4xl font-bold text-white w-70">
          <Link to="/admin/dashboard">JunkPickup management</Link>
        </h1>
        <h2 className="text-2xl font-bold text-white w-70">
          Admin
          {auth ? (
            <Link to="/admin/login" onClick={logout}>
              (Logout)
            </Link>
          ) : (
            <></>
          )}
        </h2>
      </div>
    </header>
  );
};

export default AdminNavBar;
