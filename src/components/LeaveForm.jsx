"use client"

import React, { useState } from 'react';

const LeaveForm = () => {
    const [leaveType, setLeaveType] = useState("")
    return (
        <div>
            <form className="max-w-md mx-auto my-2">
                <div className="mb-5">
                    <label htmlFor="LeaveDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span className=' text-red-500 font-extrabold'>*</span>Leave Description:</label>
                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Select</option>
                        <option value="compensatory-off">Compensatory-Off</option>
                        <option value="privilege-leave">Privilege leave</option>
                        <option value="sick-leave">Sick leave</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="from-date" className="text-sm font-medium text-gray-700 px-2"><span className=' text-red-500 font-extrabold'>*</span>From Date :</label>
                    <input
                        type="date"
                        id="from-date"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="to-date" className="text-sm font-medium text-gray-700 px-2"><span className=' text-red-500 font-extrabold'>*</span>To Date :</label>
                    <input
                        type="date"
                        id="to-date"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-5 flex flex-col">
                    <label htmlFor="message" className="text-sm py-1 font-medium text-gray-700"><span className='text-red-500 font-extrabold'>*</span>Reason For Applying :</label>
                    <div>
                        <textarea
                            id="message"
                            rows="4"
                            className="w-[100%] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply</button>
            </form>
        </div>
    );
}

export default LeaveForm;
