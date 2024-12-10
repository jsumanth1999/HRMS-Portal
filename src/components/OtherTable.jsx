import React from 'react';
import Dropdown from './Dropdown';
import { years } from '@/utils/holidayDetails';

const OtherTable = (props) => {
    console.log(props?.data);

    const { columns, holidays } = props?.data;
    console.log(props.data);

    return (
        <>
            <div>
                <Dropdown data={years} />
            </div>
            <div className='m-5'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='w-full bg-blue-950 dark:bg-white dark:text-gray-800 text-white text-md font-bold'>
                            <th colSpan="8" className="px-6 py-3 justify-center">{holidays?.[2023][0]?.title}</th>
                        </tr>
                        <tr>
                            {columns?.map((item, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {item}
                                </th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {holidays?.['2023']?.map((item, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {item.festivalDay}
                                </td>
                                <td className="px-6 py-4">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4">
                                    {item.holidayType}
                                </td>
                                <td className="px-6 py-4">
                                    {item.alternateWorkingDate}
                                </td>
                                <td className="px-6 py-4 pl-0">
                                    <button className='bg-blue-500 text-white px-2 py-2 m-2 font-bold'>Edit</button>
                                    <button className='bg-red-500 text-white px-2 py-2 m-2 font-bold'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>

    );
}

export default OtherTable;
