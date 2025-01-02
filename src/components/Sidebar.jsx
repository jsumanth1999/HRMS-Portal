"use client";
import React, { useState } from "react";
import DarkModeToggle from "./DarkmodeToggle";
import { data } from "@/utils/data";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaUser, FaCalendarAlt, FaHistory, FaLaptop } from "react-icons/fa";
import { usePathname } from "next/navigation"; // Import usePathname
import { FaUserGroup } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";

const Sidebar = ({ userRole }) => {
  const [openDropdown, setOpenDropdown] = useState(null); 
  const pathname = usePathname(); // Get the current path
  const selector = useSelector((state) => state.user.role);

  const getIconByName = (name) => {
    switch (name) {
      case "Employee":
        return <FaUser />;
      case "Holidays":
        return <FaCalendarAlt />;
      case "Leaves":
        return <FaHistory />;
      case "Profile":
        return <FaLaptop />;
      case "Contact":
        return <FaUser />;
      case "Inputs":
        return <FaLaptop />;
      case "Sign In":
        return <FaSignInAlt />;
      case "User Management":
        return <FaUserGroup />;
      default:
        return null;
    }
  };

  return (
    <div>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 pt-[50px] overflow-y-auto shadow-xl bg-gray-50 border-gray-500 dark:bg-gray-800">
          {data.map((item, index) => (
            <ul key={index} className="space-y-2 pt-3 font-medium">
              <li>
                {(selector !== "User" || item.name !== "User Management") && (
                  <button
                    type="button"
                    className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group ${
                      pathname === item.link
                        ? "bg-gray-300 dark:bg-gray-700"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    aria-expanded="true"
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  >
                    <span className="mx-2">{getIconByName(item.name)}</span>
                    <Link
                      href={item.link || "#"}
                      className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  </button>
                )}

                {item.childrens && (
                  <ul className={`py-2 space-y-2 ${openDropdown === index ? "" : ""}`}>
                    {item.childrens.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          href={child.link}
                          className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group ${
                            pathname === child.link
                              ? "bg-gray-300 dark:bg-gray-700"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span className="mr-2">{getIconByName(child.name)}</span>
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
