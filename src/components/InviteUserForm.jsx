"use client";

import { createUserDetails, updateUser } from "@/features/user/thunks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InviteUserForm = ({ data, onClose, reloadData }) => {  // Ensure reloadData is passed as a prop
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [user, setUser] = useState("");

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const id = selector.formId;

  useEffect(() => {
    if (id === "updateInviteForm" && data) {
      setEmployeeID(data.employeeId || "");
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setEmail(data.email || "");
      setRole(data.role || "");
      setPassword(data.password || "");
      setUser(data._id || "");
    }
  }, [data, id]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const data = {
      employeeId: employeeID,
      firstName,
      lastName,
      email,
      role,
      password,
    };
    const response = await dispatch(updateUser({ userId: user, body: data }));
    if (response.meta.requestStatus === "fulfilled") {
      onClose();  // Close the modal after successful update
      if (reloadData) reloadData();  // Ensure reloadData is called
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    const data = {
      employeeId: employeeID,
      firstName,
      lastName,
      role,
      email,
      password,
    };
    const response = await dispatch(createUserDetails(data));
    if (response.meta.requestStatus === "fulfilled") {
      onClose();  // Close the modal after successful creation
      if (reloadData) reloadData();  // Ensure reloadData is called
    }
  };

  return (
    <form className="max-w-md mx-auto my-2">
      <div className="mb-5">
        <label
          htmlFor="firstname"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Employee ID:
        </label>
        <input
          type="text"
          id="firstname"
          value={employeeID}
          onChange={(e) => {
            setEmployeeID(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="firstname"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>First Name:
        </label>
        <input
          type="text"
          id="firstname"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="lastname"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Last Name:
        </label>
        <input
          type="text"
          id="lastname"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Role:
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className=" text-red-500 font-extrabold">*</span>Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      {id === "userForm" ? (
        <button
          type="submit"
          onClick={handleInviteUser}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create User
        </button>
      ) : (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
      )}
    </form>
  );
};

export default InviteUserForm;
