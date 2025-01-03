"use client";

import React from "react";
import OtherForm from "./OtherForm";
import ContactForm from "./ContactForm";
import LeaveForm from "./LeaveForm";
import InviteUserForm from "./InviteUserForm";
import HolidayForm from "./HolidayForm";
import password from "./password";

const Modal = ({ isVisible, onClose, data, userData, reloadData }) => {
  console.log(userData);
  const id = data?.id || data;
    console.log(id)
  let title;
  let FormComponent;

  switch (id) {
    case "Leave Form":
      title = "Leave Application";
      FormComponent = LeaveForm;
      break;
    case "userForm":
      title = "Create User";
      FormComponent = InviteUserForm;
      break;
    case "Contact Form":
      title = "Create Address";
      FormComponent = ContactForm;
      break;
    case "updateContactForm":
      title = "Update Address";
      FormComponent = ContactForm;
      break;
    case "updateInviteForm":
      title = "Update User";
      FormComponent = InviteUserForm;
      break;
    case "holidayForm":
        title= "Add Holiday";
        FormComponent = HolidayForm;
        break;
    case "updateHoliday":
      title = "Update Holiday";
      FormComponent = HolidayForm;
      break;
    case "updateOthers":
      title = "Update"
      FormComponent = OtherForm;
      break;
    case "updatePassword":
      title = "Update Password";
      FormComponent = password;
      break;
    default:
      title = "Create Other Info";
      FormComponent = OtherForm;
      break;
  }

  return (
    <div>
      {/* Show modal only when isVisible is true */}
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden={!isVisible}
        className={
          isVisible
            ? "fixed inset-0 z-50 flex justify-center items-center w-full h-full backdrop-blur-sm bg-black bg-opacity-50"
            : "hidden"
        }
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative p-5 bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:px-5 md:py-3 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Render the appropriate form */}
            <FormComponent data={userData} onClose={onClose} reloadData={reloadData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
