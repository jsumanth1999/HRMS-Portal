"use client"

import React, { useState } from 'react';
import ContactTable from '@/components/ContactTable';
import Modal from '@/components/Modal';
import { leavesDetails } from '@/utils/leavesDetails';
import { leaveForm } from '@/utils/personDetails';

const Page = () => {
  // State to control visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle button click to show modal
  const handleApplyButton = () => {
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className='flex justify-end'>
        <button
          className="bg-blue-800 text-white m-2 px-4 py-2 font-bold"
          onClick={handleApplyButton}
        >
          Apply Leave
        </button>
      </div>

      {/* Display the modal when isModalVisible is true */}
      <Modal 
        isVisible={isModalVisible} 
        onClose={handleCloseModal} 
        data={leaveForm} 
      />

      <div>
        <ContactTable data={leavesDetails} />
      </div>
    </div>
  );
}

export default Page;
