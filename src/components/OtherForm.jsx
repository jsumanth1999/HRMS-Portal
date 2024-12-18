"use client";
import { createContact } from "@/features/contacts/thunks";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const OtherForm = ({ onClose, reloadData }) => {
  const [contacttype, setContacttype] = useState("Email");
  const [data, setData] = useState("");

  const dispatch = useDispatch();

  let defaultValue = contacttype;

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    const details = {
      type: "others",
      address: [],
      others: [
        {
          channelType: contacttype,
          contactType: contacttype,
          primaryChannel: false,
          value: data,
        },
      ],
    };
    console.log(data);
    const res = await dispatch(createContact(details));

    if (res?.meta?.requestStatus === "fulfilled") {
      onClose();
      setContacttype("Email");
      setData("");
      if (reloadData) reloadData();
    }
  };

  return (
    <form className="max-w-sm mx-auto my-2">
      <div className="mb-5">
        <label
          htmlFor="contacttype"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Contact Type:
        </label>
        <select
          id="contacttype"
          value={contacttype}
          onChange={(e) => setContacttype(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
        </select>
      </div>
      <div className="mb-5">
        <label
          htmlFor="contactchannel"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Contact
          Channel:
        </label>
        <input
          type="text"
          id="contactchannel"
          value={defaultValue}
          onChange={(e) => {
            setContacttype(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <span className=" text-red-500 font-extrabold">*</span>Value:
        </label>
        <input
          type="text"
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSubmitHandler}
      >
        Submit
      </button>
    </form>
  );
};

export default OtherForm;
