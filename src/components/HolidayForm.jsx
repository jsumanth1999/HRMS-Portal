import { createHoliday, updateHoliday } from "@/features/holidays/thunks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HolidayForm = ({ data, onClose, reloadData }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [holidayType, setHolidayType] = useState("");
  const [alternateWorkingDate, setAlternateWorkingDate] = useState("");
  const [holiday, setHoliday] = useState("");

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.holiday);
  const formId = selector.holidayId;

  useEffect(() => {
    const d = new Date(data?.date);
    const al = new Date(data?.alternateWorkingDate);
    const day1 = String(al.getDate()).padStart(2, "0"); // Zero-pad day
    const month1 = String(al.getMonth() + 1).padStart(2, "0"); // Zero-pad month
    const year1 = al.getFullYear();
    const day = String(d.getDate()).padStart(2, "0"); // Zero-pad day
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Zero-pad month
    const year = d.getFullYear();
    if (formId === "updateHoliday" && data) {
      setTitle(data?.title || ""),
        setDate(`${year}-${month}-${day}` || ""),
        setHolidayType(data?.holidayType || ""),
        setAlternateWorkingDate(`${year1}-${month1}-${day1}` || "");
        setHoliday(data?._id);
    }
  }, [data, formId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const d = new Date(date);
    const year = d.getFullYear();
    const formattedDate = d.toISOString().split("T")[0]; 

    const formattedAlternateWorkingDate =
      alternateWorkingDate && new Date(alternateWorkingDate).toISOString().split("T")[0];

    const data = {
      title,
      date: formattedDate,
      year,
      holidayType,
      alternateWorkingDate: formattedAlternateWorkingDate || "0000-00-00",
    };

    const response = await dispatch(updateHoliday({ holidayId: holiday, body: data }));
    if (response.meta.requestStatus === "fulfilled") {
      onClose(); 
      if (reloadData) reloadData(); 
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const d = new Date(date);
    const year = d.getFullYear();
    const data = {
      title,
      date,
      year: year,
      holidayType,
      alternateWorkingDate: alternateWorkingDate,
    };

    const res = await dispatch(createHoliday(data));
    if (res.meta.requestStatus === "fulfilled") {
      onClose(); // Close the modal after successful update
      if (reloadData) reloadData(); // Ensure reloadData is called
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto my-2">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <span className=" text-red-500 font-extrabold">*</span>Holiday Name:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <span className=" text-red-500 font-extrabold">*</span>Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <span className=" text-red-500 font-extrabold">*</span>Holiday Type:
          </label>
          <input
            type="text"
            id="type"
            value={holidayType}
            onChange={(e) => setHolidayType(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alternate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Alternate Working Date:
          </label>
          <input
            type="date"
            id="alternate"
            value={alternateWorkingDate}
            onChange={(e) => setAlternateWorkingDate(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        {formId === "updateHoliday" ? (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Create Holiday
          </button>
        )}
      </form>
    </div>
  );
};

export default HolidayForm;
