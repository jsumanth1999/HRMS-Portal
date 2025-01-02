"use client"

import { setYear } from '@/features/holidays/slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Dropdown = () => {

    const [Contacttype, setContacttype] = useState("Address");
    const dispatch = useDispatch();
    const list = useSelector((state) => state.holiday.yearsList)

    useEffect(() => {
        dispatch(setYear(Contacttype))
    },[Contacttype])

    return (
        <div className='m-2 w-[15%]'>
            <form className="max-w-sm mx-auto mb-[60px]">
                <label htmlFor="countries" className="block text-sm font-medium text-gray-900 dark:text-white">
                     Select Year
                </label>
                <select
                    value={Contacttype}
                    onChange={(e) => setContacttype(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {/* Map through the yearsList and render each option */}
                    {list[0].map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
}

export default Dropdown;
