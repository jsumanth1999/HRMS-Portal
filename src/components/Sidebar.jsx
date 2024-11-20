"use client"
import React, { useState } from 'react';
import DarkModeToggle from './DarkmodeToggle';
import { data } from '@/utils/data';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import Table from './Table';

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown
    };

    return (
        <div>
            <DarkModeToggle />
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
            </button>

            <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 pt-[50px] overflow-y-auto shadow-xl bg-gray-50 border-gray-500 dark:bg-gray-800">
                    {data.map((item, index) => {
                        return (
                            <ul key={index} className="space-y-2 pt-3 font-medium">
                                <li>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                                        onClick={() => toggleDropdown(`dropdown-${index}`)}
                                        aria-controls={`dropdown-${index}`}
                                        aria-expanded={openDropdown === `dropdown-${index}` ? 'true' : 'false'}
                                    >
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{item.name}</span>
                                        {openDropdown === `dropdown-${index}` ? <IoIosArrowDown /> : <IoIosArrowForward />
                                        }

                                    </button>

                                    {/* Dropdown content */}
                                    <ul id={`dropdown-${index}`} className={`py-2 space-y-2 ${openDropdown === `dropdown-${index}` ? '' : 'hidden'}`}>
                                        {item?.childrens.map((child, childIndex) => (
                                            <li key={childIndex}>
                                                <a href={child.link} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                                                    {child.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        );
                    })}
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
            </div>

        </div>
    );
}

export default Sidebar;
