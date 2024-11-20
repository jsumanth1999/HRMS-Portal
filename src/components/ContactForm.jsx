"use client"
import React, { useState } from 'react';
import { StatesData } from '@/utils/stateData';

const ContactForm = () => {
    const [selectedState, setSelectedState] = useState("");
    const [country, setCountry] = useState("");
    
    const states = StatesData;

    return (
        <div className='flex justify-center'>
            <div className='border border-white dark:border-black w-1/2 shadow-2xl py-10'>
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="addressLine1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span className=' text-red-500 font-extrabold'>*</span>Address Line1:</label>
                        <input type="text" id="addressLine1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="addressLine2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line2:</label>
                        <input type="text" id="addressLine2" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span className=' text-red-500 font-extrabold'>*</span>City:</label>
                        <input type="text" id="city" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="states" className="block text-sm font-medium text-gray-900 dark:text-white">
                        <span className='text-red-500 font-extrabold'>*</span>Select State
                        </label>
                        <select
                            id="states"
                            value={selectedState} 
                            onChange={(e) => setSelectedState(e.target.value)} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {states.map((state) => (
                                <option key={state.value} value={state.value}>
                                    {state.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="postcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span className=' text-red-500 font-extrabold'>*</span>Post Code:</label>
                        <input type="text" id="postcode" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-900 dark:text-white"><span className=' text-red-500 font-extrabold'>*</span>Select Country</label>
                        <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Select</option>
                            <option value="India">India</option>
                        </select>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;