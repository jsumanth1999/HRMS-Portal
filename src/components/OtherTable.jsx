import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { years } from '@/utils/holidayDetails';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHoliday, fetchHolidayById, fetchHolidays } from '@/features/holidays/thunks';
import Modal from './Modal';
import { setHolidayForm } from '@/features/holidays/slice';

const OtherTable = (props) => {

    const { columns, holidays } = props?.data;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [holidayData, setHolidayData] = useState("");
    const [formId, setFormId] = useState();
    const dispatch = useDispatch();

    const selector = useSelector((state) => state.holiday);
    let fullYear = selector.year;

    if(fullYear === "Address"){
        fullYear = 2023;
    }

    const handleEdit = async(id) => {
        dispatch(setHolidayForm("updateHoliday"))
        const res = await dispatch(fetchHolidayById({holidayId : id}));
        setIsModalVisible(true);
        setFormId("updateHoliday")
        setHolidayData(res.payload.data);
    }

    const handleDelete = async(id) => {
        console.log(id);
        const res = await dispatch(deleteHoliday({holidayId : id}));
        await dispatch(fetchHolidays(dispatch))
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
            fetchHolidays(); // Ensure reloadData is called
          }
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
      };

    return (
        <>
            <div>
                <Dropdown data={years} />
            </div>
            <div className='m-5'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='w-full bg-blue-950 dark:bg-white dark:text-gray-800 text-white text-md font-bold'>
                            <th colSpan="8" className="px-6 py-3 justify-center">{holidays.title || "List of Holidays"} </th>
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
                        {holidays?.[fullYear]?.map((item, index) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {item.title}
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
                                    <button className='bg-blue-500 text-white px-2 py-2 m-2 font-bold' onClick={() => handleEdit(`${item._id}`)}>Edit</button>
                                    <button className='bg-red-500 text-white px-2 py-2 m-2 font-bold' onClick={() => handleDelete(`${item._id}`)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <Modal isVisible={isModalVisible} onClose={handleCloseModal} data={formId} userData={holidayData}></Modal>
        </>

    );
}

export default OtherTable;
