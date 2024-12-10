"use client"

import ContactTable from '@/components/ContactTable';
import Modal from '@/components/Modal';
import { userFrom } from '@/utils/personDetails';
import { user } from '@/utils/userManagement';
import React, { useState } from 'react';
import { FaUserPlus } from "react-icons/fa";

const page = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleUserButton = () => {
        setIsModalVisible(true);
      };
    
      // Handle modal close
      const handleCloseModal = () => {
        setIsModalVisible(false);
      };

    return (
        <div className="p-4 sm:ml-64">
            <div className='flex flex-row justify-end'>
                <button className="flex font-bold items-center space-x-2 bg-blue-950 dark:bg-white dark:text-blue-950 text-white px-4 py-2 rounded" 
                onClick={handleUserButton}>
                    <FaUserPlus />
                    <span>Invite User</span>
                </button>
            </div>
            <Modal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                data={userFrom}
            />
            <ContactTable data={user} />
        </div>
    );
}

export default page;
