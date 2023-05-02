import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { BsChevronExpand } from "react-icons/bs";

import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import {
  BsChevronDown,
  BsChatLeftText,
  BsCalendarCheck,
  BsFiles,
  BsServer,
} from "react-icons/bs";
import { FaQuestion, FaImage } from "react-icons/fa";

const Menus = [
  { title: "Dashboard", src: "/admin/dashboard", icon: <MdOutlineDashboard /> },
  { title: "Chat", src: "/admin/chat", icon: <BsChatLeftText /> },
  { title: "Users", src: "/admin/users", gap: true, icon: <MdAccountCircle /> },
  { title: "Booking", src: "/admin/bookings", icon: <BsCalendarCheck /> },
  { title: "Dates", src: "/admin/dates", icon: <BsCalendarCheck /> },
  { title: "Recycle", src: "/admin/recycle", icon: <BsCalendarCheck /> },
  { title: "FAQs", src: "", icon: <FaQuestion /> },
  { title: "Banners", src: "/admin/banners", icon: <FaImage /> },
  { title: "items", src: "/admin/items", icon: <BsFiles /> },

  { title: "Logout", src: "/admin/logout", gap: true, icon: <MdLogout /> },
];

const AdminSideBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen1, setSubMenuOpen1] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="h-screen -mb-20 flex justify-end">
      <button
        className="fixed lg:hidden z-90 bottom-10 right-10 bg-teal-800 w-10
        rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl
         hover:bg-teal-800 duration-300"
        onClick={toggleSidebar}
      >
        <span>
          <BsChevronExpand />
        </span>
      </button>
      <div
        className={`${
          open ? "w-48" : "w-0"
        } lg:w-72 bg-teal-800 relative duration-500 `}
      >
        <ul className={`${open ? "pt-6" : "invisible"}`}>
          {Menus.map((Menu, index) => (
            <React.Fragment key={uuidv4()}>
              <Link to={Menu.src}>
                <li
                  key={uuidv4()}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-teal-400 text-white text-lg 
                items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"}`}
                >
                  {Menu.icon}
                  <span className="flex-1">{Menu.title}</span>

                  {Menu.subMenus1 && (
                    <BsChevronDown
                      key={uuidv4()}
                      className={`${subMenuOpen1 && "rotate-180"}`}
                      onClick={() => setSubMenuOpen1(!subMenuOpen1)}
                    />
                  )}
                </li>
              </Link>

              {Menu.subMenus1 && subMenuOpen1 && open && (
                <ul>
                  {Menu.subMenus1.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className="flex px-5 cursor-pointer text-center text-lg text-gray-200 py-1"
                    >
                      {subMenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
