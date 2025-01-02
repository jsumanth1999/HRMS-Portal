"use client";
import React, { useEffect, useState } from "react";
import { StatesData } from "@/utils/stateData";
import { useDispatch, useSelector } from "react-redux";
import { createContact, updateContact } from "@/features/contacts/thunks";
import { setIsAddressEdit } from "@/features/contacts/slice";

const ContactForm = ({ data, onClose, reloadData }) => {
  const [selectedState, setSelectedState] = useState("");
  const [country, setCountry] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [addressType, setAddressType] = useState("");
  const [user, setUser] = useState("");

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.contact);
  const id = selector.contactId;

  useEffect(() => {
    if (
      id === "updateContactForm" &&
      selector.activeTab === "address" &&
      data
    ) {
      console.log(data.address);
      setAddressType(data.address.addressType || "");
      setAddressLine1(data.address.addressLine1 || "");
      setAddressLine2(data.address.addressLine2 || "");
      setCity(data.address.city || "");
      setSelectedState(data.address.state || "");
      setPostCode(data.address.postalCode || "");
      setUser(data._id || "");
      setCountry(data.address.country || "");
    }
  }, [data, id]);

  const states = StatesData;

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(setIsAddressEdit(false));
    const data = {
      type: "address",
      address: {
        addressType,
        addressLine1,
        addressLine2,
        city,
        state: selectedState,
        postalCode: postCode,
        country,
      },
    };
    const res = await dispatch(createContact(data));

    if (res?.meta?.requestStatus === "fulfilled") {
      onClose();
      setAddressLine1("");
      setAddressLine2("");
      setAddressType("");
      setCity("");
      setCountry("");
      setSelectedState("");
      setPostCode("");

      if (reloadData) reloadData();
    }
  };

  const handleEditHandler = async (e) => {
    e.preventDefault();
    const data = {
      type: "address",
      address: {
        addressLine1,
        addressLine2,
        addressType,
        postalCode: postCode,
        state: selectedState,
        country,
        city,
      },
    };

    const res = await dispatch(updateContact({ contactId: user, body: data }));

    if (res.meta.requestStatus === "fulfilled") {
      onClose(); 
      if (reloadData) reloadData(); 
    }
  };

  return (
    <form className="max-w-md mx-auto my-2">
      <div className="mb-5">
        <label
          htmlFor="addressType"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Address Type:
        </label>
        <input
          type="text"
          id="addressType"
          value={addressType}
          onChange={(e) => {
            setAddressType(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="addressLine1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Address Line1:
        </label>
        <input
          type="text"
          id="addressLine1"
          value={addressLine1}
          onChange={(e) => {
            setAddressLine1(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="addressLine2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Address Line2:
        </label>
        <input
          type="text"
          id="addressLine2"
          value={addressLine2}
          onChange={(e) => {
            setAddressLine2(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>City:
        </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="states"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className="text-red-500 font-extrabold">*</span>Select State
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
        <label
          htmlFor="postcode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Post Code:
        </label>
        <input
          type="text"
          id="postcode"
          value={postCode}
          onChange={(e) => {
            setPostCode(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="country"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Select Country
        </label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="India">India</option>
        </select>
      </div>

      {selector.isAddressEdit ? (
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

export default ContactForm;
