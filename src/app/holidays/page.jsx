"use client";
import React, { useEffect, useState } from "react";
import OtherTable from "@/components/OtherTable";
import { useDispatch, useSelector } from "react-redux";
import { setHolidayForm } from "@/features/holidays/slice";
import Modal from "@/components/Modal";
import { handleListHolidays } from "@/utils/handleListUser";
import { setContactId } from "@/features/contacts/slice";

const page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
    const Id = useSelector((state) => state.holiday.holidayId);
    console.log(Id);
    dispatch(setContactId(null))
    const fetchHolidays = async () => {
        try {
            setLoading(true);
          const data = await handleListHolidays(dispatch); 
          setUserData(data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }finally {
            setLoading(false);
          }
      };
    
      useEffect(() => {
        fetchHolidays();
      }, [dispatch]);

  const showForm = async () => {
    await dispatch(setHolidayForm("holidayForm"));
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex justify-end">
        <button
          className="flex font-bold items-center space-x-2 bg-blue-950 dark:bg-white dark:text-blue-950 text-white px-4 py-2 rounded"
          aria-label="Add Holiday"
          onClick={showForm}
        >
          <span>Add Holiday</span>
        </button>
      </div>
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          data={Id}
          reloadData={fetchHolidays}
        />
      )}
      <div>
      {loading ? (
        <p>Loading user details...</p>
      ) : userData ? (
        <OtherTable data={userData} reloadData={fetchHolidays}/>
      ) : (
        <p>No user details available.</p>
      )}
      </div>
    </div>
  );
};

export default page;
