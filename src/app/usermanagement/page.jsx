"use client";

import ContactTable from "@/components/ContactTable";
import Modal from "@/components/Modal";
import { setFormId } from "@/features/user/slice";
import { handleListUser } from "@/utils/handleListUser";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const formId = useSelector((state) => state.user?.formId);

  const fetchData = async () => {
    try {
      const data = await handleListUser(dispatch); // Ensure `dispatch` is passed
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const reloadData = async () => {
    setLoading(true);  
    try {
      const data = await handleListUser(dispatch); 
      setUserData(data);  
    } catch (error) {
      console.error("Failed to reload data:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleUserButton = () => {
    dispatch(setFormId("userForm"));
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4 sm:ml-64">
      {/* Invite User Button */}
      <div className="flex flex-row justify-end">
        <button
          className="flex font-bold items-center space-x-2 bg-blue-950 dark:bg-white dark:text-blue-950 text-white px-4 py-2 rounded"
          onClick={handleUserButton}
          aria-label="Invite User"
        >
          <FaUserPlus />
          <span>Invite User</span>
        </button>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          data={formId}
          reloadData={reloadData}  
        />
      )}

      {loading ? (
        <p>Loading user details...</p>
      ) : userData ? (
        <ContactTable data={userData} reloadData={reloadData} />
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
};

export default Page;
