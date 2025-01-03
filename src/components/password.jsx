"use client";
import { updateUser } from "@/features/user/thunks";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Password = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = selector.passwordId;

  const updatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    const body = {
      password: confirmPassword,
    };

    try {
      await dispatch(updateUser({ userId: id, body }));
      alert("Password updated successfully.");
      onClose(); // Close the modal on success
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="p-4" onSubmit={updatePassword}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium" htmlFor="newPassword">
          New Password:
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
          required
        />
      </div>
      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium"
          htmlFor="confirmPassword"
        >
          Confirm Password:
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="shadow-sm bg-gray-50 border rounded-lg p-2.5 w-full"
          required
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <button
        type="submit"
        className={`text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 w-full ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default Password;
