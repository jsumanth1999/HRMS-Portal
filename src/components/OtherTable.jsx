import React from 'react';

const OtherTable = () => {
  return (
    <div className='m-5'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='w-full bg-blue-950 dark:bg-white dark:text-gray-800 text-white text-md font-bold'>
                        <th colSpan="8" className="px-6 py-3 justify-center">Other COntact Information</th>
                    </tr>
                    <tr>
                    <th scope="col" className="px-6 py-3">
                            S.no
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contact Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Channel Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Value
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Primary Channel
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1
                        </th>
                        <td className="px-6 py-4">
                            Email
                        </td>
                        <td className="px-6 py-4">
                            Email
                        </td>
                        <td className="px-6 py-4">
                           sumanth.jaladurgam@meeamitech.com
                        </td>
                        <td className="px-6 py-4">
                           Yes
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

export default OtherTable;
