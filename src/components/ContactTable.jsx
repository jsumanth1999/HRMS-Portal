"use client"
import React from 'react';

const ContactTable = (props) => {
    console.log(props);
    const { data, id } = props;
    const details = data;
    const name = id;

    console.log(name);
    console.log(details?.rows);

    const lengthValue = details?.columns.length;
    console.log(lengthValue);

    if (!details) return;

    return (
        <div className="m-5 relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='w-full bg-blue-950 dark:bg-white dark:text-gray-800 text-white text-md font-bold'>
                        <th colSpan={lengthValue + 1} className="px-6 py-3 justify-center">{details.title}</th>
                    </tr>
                    <tr>
                        {details?.columns?.map((column, index) => (
                            <th key={index} scope="col" className="text-center px-6 py-3">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        details?.rows ? (
                            details?.rows?.map((row, rowIndex) => (
                                <tr key={rowIndex} className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    {row.map((item, index) => (
                                        <td key={index} className="px-2 py-4">
                                            {item}
                                        </td>
                                    ))}
                                    <td className='px-2 py-4'>
                                        <button className="px-2 m-2 py-2 bg-blue-500 text-white font-bold">Edit</button>
                                        <button className="px-2 m-2 py-2 bg-red-500 text-white font-bold">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            details?.name?.rows?.map((row, rowIndex) => (
                                <tr key={rowIndex} className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    {row.map((item, index) => (
                                        <td key={index} className="px-2 py-4">
                                            {item}
                                        </td>
                                    ))}
                                    <td className='px-2 py-4'>
                                        <button className="px-2 m-2 py-2 bg-blue-500 text-white font-bold">Edit</button>
                                        <button className="px-2 m-2 py-2 bg-red-500 text-white font-bold">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ContactTable;
