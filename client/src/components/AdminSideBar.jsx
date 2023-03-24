import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
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
import {FaQuestion, FaImage} from "react-icons/fa";

const Menus = [
  { title: "Dashboard", src: "Chart_fill", icon: <MdOutlineDashboard /> },
  { title: "Inbox", src: "Chat", icon: <BsChatLeftText /> },
  { title: "Users", src: "User", gap: true, icon: <MdAccountCircle /> },
  { title: "Schedule", src: "Calendar", icon: <BsCalendarCheck /> },
  {
    title: "FAQs",
    src: "Services",
    icon: <FaQuestion />,
    subMenus1: [
      {
        title: "Add FAQ",
        src: "/services/services1",
        cName: "sub-nav",
      },
      {
        title: "Update FAQ",
        src: "/services/services2",
        cName: "sub-nav",
      },
      {
        title: "View FAQs",
        src: "/services/services3",
        
      },
    ],
  },
  {
     title: "Banners",
      src: "Chart",
       icon: <FaImage /> ,
       subMenus2: [
        {
          title: "Add Banner",
          src: "/services/banner1",
          cName: "sub-nav",
        },
        {
          title: "Update Banner",
          src: "/services/banner2",
          cName: "sub-nav",
        },
        {
          title: "View Banners",
          src: "/services/banner3",
          
        },
      ],
  },

  { title: "Files", src: "Folder", gap: true, icon: <BsFiles /> },
  { title: "Setting", src: "Setting", icon: <MdOutlineSettings /> },
  { title: "Logout", src: "Logout", icon: <MdLogout /> },
];
const AdminSideBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen1, setSubMenuOpen1] = useState(false);
  const [subMenuOpen2, setSubMenuOpen2] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className="h-screen flex items-end justify-end">
      <button
        className="fixed lg:hidden z-90 bottom-10 right-10 bg-teal-800 w-10 h-10 
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
        } lg:w-72 bg-teal-800 h-screen relative duration-500 `}
      >
        <div className="justify-center mt-3">
          <h1
            className={`text-white font-medium text-2xl text-center duration-200 ${
              !open && "invisible"
            }`}
          >
            LOGO
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <React.Fragment key={uuidv4()}>
              <li key={uuidv4()}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-teal-400 text-white text-sm 
                items-center gap-x-4 ${Menu.gap ? 'mt-9' : 'mt-2' }`}
              >
                {Menu.icon}

                <span className="flex-1">{Menu.title}</span>

                {Menu.subMenus1 && (
                  <BsChevronDown key={uuidv4()}
                    className={`${subMenuOpen1 && "rotate-180"}`}
                    onClick={() => setSubMenuOpen1(!subMenuOpen1)}
                  />
                )}
                {Menu.subMenus2 && (
                  <BsChevronDown key={uuidv4()}
                    className={`${subMenuOpen2 && "rotate-180"}`}
                    onClick={() => setSubMenuOpen2(!subMenuOpen2)}
                  />
                )}

              </li>

              {Menu.subMenus1 && subMenuOpen1 && open && (
                <ul>
                  {Menu.subMenus1.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className="flex px-5 cursor-pointer text-center text-sm text-gray-200 py-1"
                    >
                      {subMenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
              {Menu.subMenus2 && subMenuOpen2 && open && (
                <ul>
                  {Menu.subMenus2.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className="flex px-5 cursor-pointer text-center text-sm text-gray-200 py-1"
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
