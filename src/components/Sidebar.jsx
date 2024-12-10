"use client";
import React, { useState } from "react";
import DarkModeToggle from "./DarkmodeToggle";
import { data } from "@/utils/data";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaUser, FaCalendarAlt, FaHistory, FaLaptop } from "react-icons/fa";
import { PiSignOutFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { FaUserGroup } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link"; // Import Link for client-side navigation

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeChild, setActiveChild] = useState(null);
  const router = useRouter();

  const toggleDropdown = (id, event) => {
    if (event) {
      event.stopPropagation();
    }
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleChildClick = (childIndex, link, event) => {
    setActiveChild(childIndex);
    event.preventDefault();
    router.push(link); // Use Next.js router for client-side navigation
  };

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
      <DarkModeToggle />
      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)} // Toggle sidebar visibility
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 pt-[50px] overflow-y-auto shadow-xl bg-gray-50 border-gray-500 dark:bg-gray-800">
          {data.map((item, index) => (
            <ul key={index} className="space-y-2 pt-3 font-medium">
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  onClick={(e) => toggleDropdown(index, e)}
                  aria-expanded={openDropdown === index ? "true" : "false"}
                >
                  <span className="mx-2">{getIconByName(item.name)}</span>
                  <Link
                    href={item.link || "#"}
                    className="flex items-center text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 pr-2"
                  >
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>

                  {/* Conditionally render arrow only if there are children */}
                  {item?.childrens && (
                    <span className="ml-auto">
                      {openDropdown === index ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowForward />
                      )}
                    </span>
                  )}
                </button>

                {/* Dropdown content */}
                {item?.childrens && (
                  <ul className={`py-2 space-y-2 ${openDropdown === index ? "" : "hidden"}`}>
                    {item.childrens.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          href={child.link}
                          onClick={(e) => handleChildClick(childIndex, child.link, e)}
                          className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group ${
                            activeChild === childIndex
                              ? "bg-gray-300 dark:bg-gray-700"
                              : "hover:bg-gray-200"
                          } dark:text-white dark:hover:bg-gray-700`}
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
