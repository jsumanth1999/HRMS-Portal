"use client"

import React from 'react';
import OtherForm from './OtherForm';
import ContactForm from './ContactForm';
import LeaveForm from './LeaveForm';
import InviteUserForm from './InviteUserForm';

const Modal = ({ isVisible, onClose, data }) => {
    console.log(data);

    return (
        <div>
            {/* Show modal only when isVisible is true */}
            <div
                id="crud-modal"
                tabIndex="-1"
                aria-hidden={isVisible ? 'false' : 'true'}
                className={isVisible ? 'fixed inset-0 z-50 flex justify-center items-center w-full h-full backdrop-blur-sm bg-black bg-opacity-50' : 'hidden'}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative p-5 bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:px-5 md:py-3 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {data?.id === "Leave Form" ? (
                                    'Leave Application'
                                ) : data?.id === 'userForm' ? 'Create User' : data?.id === "Contact Form" ? (
                                    'Create Address'
                                ) : (
                                    'Create Other Info'
                                )}
                            </h3>
                            {/* Close button */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Render appropriate form based on data */}
                        {data?.id === "Leave Form" ? (
                            <LeaveForm />
                        ) : data?.id === 'userForm' ? <InviteUserForm /> : data?.id === "Contact Form" ? (
                            <ContactForm />
                        ) : (
                            <OtherForm />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
