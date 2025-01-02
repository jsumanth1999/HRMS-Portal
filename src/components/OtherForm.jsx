"use client";
import { setOtherId } from "@/features/contacts/slice";
import { createContact, updateContact } from "@/features/contacts/thunks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OtherForm = ({ data, onClose, reloadData }) => {
  const [contacttype, setContacttype] = useState("Email");
  const [data1, setData1] = useState("");
  const [user, setUser] = useState("");
  const selector = useSelector((state) => state.contact);

  const dispatch = useDispatch();

  let defaultValue = contacttype;

  useEffect(() => {
    if (selector.activeTab === "others") {
      setContacttype(data?.others?.contactType || "");
      setData1(data?.others?.value || "");
      setUser(data?._id || "");
    }
  }, []);

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    const details = {
      type: "others",
      others: {
        channelType: contacttype,
        contactType: contacttype,
        value: data1,
      },
    };
    const res = await dispatch(createContact(details));

    if (res?.meta?.requestStatus === "fulfilled") {
      onClose();
      setContacttype("Email");
      setData1("");
      if (reloadData) reloadData();
    }
  };

  const handleEditHandler = async (e) => {
    e.preventDefault();
    const data = {
      type: "others",
      others: {
        contactType: contacttype,
        channelType: contacttype,
        value: data1,
      },
    };
    const res = await dispatch(updateContact({ contactId: user, body: data }));
    if (res.meta.requestStatus === "fulfilled") {
      onClose();  // Close the modal after successful update
      if (reloadData) reloadData();  // Ensure reloadData is called
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
          value={data1}
          onChange={(e) => {
            setData1(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>

      {selector.otherId === "updateOthers" ? (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleEditHandler}
        >
          Update
        </button>
      ) : (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmitHandler}
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default OtherForm;
