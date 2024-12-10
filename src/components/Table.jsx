"use client"
import React from 'react';

const Table = (props) => {
    const details = props?.data;
    console.log(details);
    const lengthValue = details?.rows?.length;
    if (!details) {
        return;
    }

    return (
        <div className="m-10 relative overflow-x-auto w-full sm:w-auto shadow-2xl sm:rounded-lg">
            <button className='bg-blue-500 text-white px-2 flex justify-end text-center'>Edit</button>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-md font-bold text-white uppercase bg-blue-950 dark:bg-white border dark:text-blue-900">
                    <tr>
                        <th scope="col" colSpan={lengthValue + 1} className="px-6 py-3">{details?.title}</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                {details?.rows?.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                            <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                {item?.name}
                            </td>
                            <td className="px-6 py-4">{item?.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
