"use client";

import { createUserDetails, updateUser } from "@/features/user/thunks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InviteUserForm = ({ data, onClose, reloadData }) => {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [user, setUser] = useState("");
  const [saluation, setSaluation] = useState("");
  const [activeTab, setActiveTab] = useState("General");
  const [middleName, setMiddleName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [designation, setDesignation] = useState("");
  const [division, setDivision] = useState("");
  const [taxProcessor, setTaxProcessor] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [pfJoinDate, setPFJoinDate] = useState("");
  const [dateOfConfirmation, setDateOfConfirmation] = useState("");

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const id = selector.formId;

  useEffect(() => {
    if (id === "updateInviteForm" && data) {
      setEmployeeID(data?.employeeId || "");
      setFirstName(data?.firstName || "");
      setLastName(data?.lastName || "");
      setEmail(data?.email || "");
      setRole(data?.role || "");
      setPassword(data?.password || "");
      setUser(data?._id || "");
      setDateOfBirth(data?.dateOfBirth ? data.dateOfBirth.split("T")[0] : "");
      setEmployeeType(data?.employeeType || "");
      setCategory(data?.category || "");
      setStatus(data?.status || "");
      setDesignation(data?.designation || "");
      setSaluation(data?.saluation || "");
      setMiddleName(data?.middleName || "");
      setDivision(data?.division || "");
      setTaxProcessor(data?.taxProcessor || "");
      setDateOfJoining(
        data?.dateOfJoining ? data.dateOfJoining.split("T")[0] : ""
      );
      setPFJoinDate(data?.pfJoinDate ? data.pfJoinDate.split("T")[0] : "");
      setDateOfConfirmation(
        data?.dateOfConfirmation ? data.dateOfConfirmation.split("T")[0] : ""
      );
    }
  }, [data, id]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const payload = {
      employeeId: employeeID,
      firstName,
      lastName,
      middleName,
      email,
      role,
      password,
      dateOfBirth,
      employeeType,
      category,
      status,
      designation,
      division,
      taxProcessor,
      dateOfJoining,
      pfJoinDate,
      saluation,
      dateOfConfirmation,
    };
    const response = await dispatch(
      updateUser({ userId: user, body: payload })
    );
    if (response.meta.requestStatus === "fulfilled") {
      onClose();
      if (reloadData) reloadData();
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    const payload = {
      employeeId: employeeID,
      firstName,
      lastName,
      role,
      email,
      password,
    };
    const response = await dispatch(createUserDetails(payload));
    if (response.meta.requestStatus === "fulfilled") {
      onClose();
      if (reloadData) reloadData();
    }
  };

  return (
    <div className="max-w-lg mx-auto my-2">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "General" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("General")}
        >
          General Info
        </button>
        {id === "updateInviteForm" && (
          <button
            className={`px-4 py-2 ${
              activeTab === "Personal" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("Personal")}
          >
            Personal Details
          </button>
        )}
        {id === "updateInviteForm" && (
          <button
            className={`px-4 py-2 ${
              activeTab === "Official" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("Official")}
          >
            Official Details
          </button>
        )}
      </div>

      {/* Scrollable Form */}
      <form className="overflow-y-auto max-h-96 p-4">
        {activeTab === "General" && (
          <>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Employee ID:
              </label>
              <input
                type="text"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                First Name:
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Last Name:
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-50 border rounded-lg p-2.5 w-full"
              >
                <option value="">Select</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            {id === "userForm" && (
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                  required
                />
              </div>
            )}
          </>
        )}

        {activeTab === "Personal" && id === "updateInviteForm" && (
          <>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Saluation:
              </label>
              <input
                type="text"
                value={saluation}
                onChange={(e) => setSaluation(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                First Name:
              </label>
              <input
                type="text"
                value={firstName}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Middle Name:
              </label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Last Name:
              </label>
              <input
                type="text"
                value={lastName}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Date Of Birth:
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
              />
            </div>
          </>
        )}

        {activeTab === "Official" && id === "updateInviteForm" && (
          <>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Employee ID:
              </label>
              <input
                type="text"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Employee Type:
              </label>
              <input
                type="text"
                value={employeeType}
                onChange={(e) => setEmployeeType(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Category:
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">Status:</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Designation:
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Division:
              </label>
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Tax Processor:
              </label>
              <input
                type="text"
                value={taxProcessor}
                onChange={(e) => setTaxProcessor(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Date Of Joining:
              </label>
              <input
                type="date"
                value={dateOfJoining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                PF Join Date:
              </label>
              <input
                type="date"
                value={pfJoinDate}
                onChange={(e) => setPFJoinDate(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Date Of Confirmation:
              </label>
              <input
                type="date"
                value={dateOfConfirmation}
                onChange={(e) => setDateOfConfirmation(e.target.value)}
                className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
              />
            </div>
          </>
        )}

        {/* Buttons */}
        <button
          type="submit"
          onClick={id === "userForm" ? handleInviteUser : handleUpdateUser}
          className="text-white bg-blue-700 rounded-lg px-5 py-2.5 w-full"
        >
          {id === "userForm" ? "Create User" : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default InviteUserForm;
