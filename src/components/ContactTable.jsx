import React from 'react';

const ContactTable = () => {
    return (
        <div className="m-10 relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='w-full bg-blue-950 dark:bg-white dark:text-gray-800 text-white text-md font-bold'>
                        <th colSpan="8" className="px-6 py-3 justify-center">Address Information</th>
                    </tr>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Address Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address Line1
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address Line2
                        </th>
                        <th scope="col" className="px-6 py-3">
                            City
                        </th>
                        <th scope="col" className="px-6 py-3">
                            State
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Postal Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Country
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Home
                        </th>
                        <td className="px-6 py-4">
                            123 Main St
                        </td>
                        <td className="px-6 py-4">
                            Apt 4B
                        </td>
                        <td className="px-6 py-4">
                            New York
                        </td>
                        <td className="px-6 py-4">
                            NY
                        </td>
                        <td className="px-6 py-4">
                            10001
                        </td>
                        <td className="px-6 py-4">
                            USA
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Office
                        </th>
                        <td className="px-6 py-4">
                            456 Business Blvd
                        </td>
                        <td className="px-6 py-4">
                            Suite 300
                        </td>
                        <td className="px-6 py-4">
                            Los Angeles
                        </td>
                        <td className="px-6 py-4">
                            CA
                        </td>
                        <td className="px-6 py-4">
                            90017
                        </td>
                        <td className="px-6 py-4">
                            USA
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Billing
                        </th>
                        <td className="px-6 py-4">
                            789 Billing Ln
                        </td>
                        <td className="px-6 py-4">
                            NA
                        </td>
                        <td className="px-6 py-4">
                            CA
                        </td>
                        <td className="px-6 py-4">
                            CA
                        </td>
                        <td className="px-6 py-4">
                            94107
                        </td>
                        <td className="px-6 py-4">
                            USA
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Shipping
                        </th>
                        <td className="px-6 py-4">
                            101 Shipping St
                        </td>
                        <td className="px-6 py-4">
                            Unit 22
                        </td>
                        <td className="px-6 py-4">
                            Chicago
                        </td>
                        <td className="px-6 py-4">
                            IL
                        </td>
                        <td className="px-6 py-4">
                            60601
                        </td>
                        <td className="px-6 py-4">
                            USA
                        </td>

                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Home
                        </th>
                        <td className="px-6 py-4">
                            202 Oakwood Dr
                        </td>
                        <td className="px-6 py-4">
                            NA
                        </td>
                        <td className="px-6 py-4">
                            Miami
                        </td>
                        <td className="px-6 py-4">
                            FL
                        </td>
                        <td className="px-6 py-4">
                            33101
                        </td>
                        <td className="px-6 py-4">
                            USA
                        </td>

                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ContactTable;
