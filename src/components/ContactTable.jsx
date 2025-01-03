"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setFormId, setPasswordId } from "@/features/user/slice";
import { deleteUser, fetchUserById } from "@/features/user/thunks";
import { handleListUser } from "@/utils/handleListUser";
import { deleteContact, fetchContactById, fetchContacts } from "@/features/contacts/thunks";
import { setIsAddressEdit, setOtherId } from "@/features/contacts/slice";
import { usePathname } from "next/navigation";

const ContactTable = ({ data, reloadData }) => {
  const details = data;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.contact);

  

  // Edit handler
  const handleEdit = async (id) => {
    dispatch(setFormId("updateInviteForm"));
    const res = await dispatch(fetchUserById({ userId: id }));
    const user = res?.payload?.data;
    setUserDetail(user);
    setIsModalVisible(true);
    setModalData("updateInviteForm");
  };

  const handleContactEdit = async (id) => {
    dispatch(setOtherId("updateOthers"));
    dispatch(setIsAddressEdit(true));
    const res = await dispatch(fetchContactById({ contactId: id }));
    const address = res?.payload?.data;
    setUserDetail(address);
    setIsModalVisible(true);
    selector.activeTab === "address"
      ? setModalData("updateContactForm")
      : setModalData("updateOthers");
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser({ userId: id }));
      await handleListUser(dispatch); 
      if (reloadData) {
        fetchContacts()
        reloadData(); 
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleContactDelete = async (id) => {
    try {
      await dispatch(deleteContact({ contactId: id }));
      if (reloadData) reloadData();
    } catch (error) {
      console.error("Error while deleting contact", error);
    }
  };

  const handleUpdatePassword = (id) => {
    dispatch(setPasswordId(id));
    setIsModalVisible(true);
    setModalData("updatePassword");
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalData(null);
  };

  if (!details || !details.columns) return <p>No data available</p>;

  return (
    <div className="m-5 relative overflow-x-auto shadow-lg sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="w-full bg-blue-950 dark:bg-white dark:text-gray-800 text-white text-md font-bold">
            <th colSpan={details.columns.length + 1} className="px-6 py-3">
              {details.title}
            </th>
          </tr>
          <tr>
            {details.columns.map((column, index) => (
              <th key={index} className="text-center px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {details.rows?.map((row, rowIndex) => {
            // Ensure row is treated as an array of values
            const values = Array.isArray(row) ? row : row.values;

            if (!Array.isArray(values)) {
              console.error(
                `Row at index ${rowIndex} is not an array or does not have a 'values' property:`,
                row
              );
              return null; // Skip invalid rows
            }

            return (
              <tr
                key={row._id || `row-${rowIndex}`}
                className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                {values.map((item, index) => (
                  <td key={index} className="px-2 py-4">
                    {item}
                  </td>
                ))}

                {pathname != "/dashboard" && (
                  <td className="px-2 py-4">
                    <button
                      className="px-2 m-2 py-2 bg-blue-500 text-white font-bold"
                      onClick={() =>
                        selector.contactId === "updateContactForm"
                          ? handleContactEdit(row._id || rowIndex)
                          : handleEdit(row._id || rowIndex)
                      }
                    >
                      Edit
                    </button>
                    {pathname === "/usermanagement" && (
                      <button
                        className="px-2 m-2 py-2 bg-green-500 text-white font-bold"
                        onClick={() =>
                          handleUpdatePassword(row._id || rowIndex)
                        }
                      >
                        Reset Password
                      </button>
                    )}
                    <button
                      className="px-2 m-2 py-2 bg-red-500 text-white font-bold"
                      onClick={() =>
                        selector.contactId === "updateContactForm"
                          ? handleContactDelete(row._id || rowIndex)
                          : handleDelete(row._id || rowIndex)
                      }
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal */}
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          data={modalData}
          userData={userDetail}
          reloadData={reloadData} // Pass reloadData function
        />
      )}
    </div>
  );
};

export default ContactTable;
