"use client"
import React, { useState } from 'react';
import ContactTable from './ContactTable';
import { addressDetails, formDetails, otherDetails, otherdetails } from '@/utils/personDetails';
import Modal from './Modal';

const Tab = (props) => {
    const [activeTab, setActiveTab] = useState('address');
    const [isModalVisible, setIsModalVisible] = useState(false); // State to toggle modal visibility
    const [modalData, setModalData] = useState(null); // State to store data for the modal
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabData = props.data;

    // Function to show the modal with the corresponding data
    const openModal = (formData) => {
        setModalData(formData);
        setIsModalVisible(true); // Show modal
    };

    const closeModal = () => {
        setIsModalVisible(false); // Hide modal
        setModalData(null); // Clear modal data
    };

    const getActiveTab = (name) => {
        switch (name) {
            case "address":
                return (
                    <div className="mt-5">
                        <div className="p-4 text-gray-700">
                            <div className="flex flex-row justify-end">
                                {/* Button to open Modal for Address */}
                                <button
                                    onClick={() => openModal(formDetails)} // Pass the form data for Address
                                    className="bg-blue-500 text-white p-2 rounded-md"
                                >
                                    Add Address Details
                                </button>
                            </div>
                            <div>
                                <ContactTable data={addressDetails} />
                            </div>
                        </div>
                    </div>
                );
            case "others":
                return (
                    <div className="mt-5">
                        <div className="p-4 text-gray-700">
                            <div className="flex flex-row justify-end">
                                {/* Button to open Modal for Other Details */}
                                <button
                                    onClick={() => openModal(otherDetails)} // Pass the form data for Other
                                    className="bg-blue-500 text-white p-2 rounded-md"
                                >
                                    Add Other Details
                                </button>
                            </div>
                            <ContactTable data={otherdetails} />
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="mt-5">
                        <p className="text-gray-500">Select a tab to view content.</p>
                    </div>
                );
        }
    };

    return (
        <div>
            <div className="m-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    {
                        tabData.tabs.map((item) => (
                            <li key={item.id} className="me-2">
                                <a
                                    href="#"
                                    onClick={() => handleTabClick(item.id)}
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === item.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'} hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-400 dark:hover:border-gray-500`}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="mt-5">
                {getActiveTab(activeTab)}
            </div>

            {/* Modal Component */}
            <Modal 
                isVisible={isModalVisible} 
                onClose={closeModal} 
                data={modalData} 
            />
        </div>
    );
};

export default Tab;
