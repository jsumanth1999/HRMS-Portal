"use client";
import Table from "@/components/Table";
import React, { useEffect, useCallback, useState } from "react";
import { fetchUserById, fetchUserDetails } from "@/features/user/thunks";
import { useDispatch, useSelector } from "react-redux";
import { setFormId, setUserData } from "@/features/user/slice";
import Modal from "@/components/Modal";

const Page = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const userid = selector.userLoginId;
  const user = selector?.userdata[0];
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState("");

  const handleEdit = async (id) => {
    dispatch(setFormId("updateInviteForm"));
    console.log(id);
    const res = await dispatch(fetchUserById({ userId: id }));
    const user = res?.payload?.data;
    setUserDetail(user);
    setIsModalVisible(true);
    setModalData("updateInviteForm");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleContactEdit = async (id) => {
    dispatch(setOtherId("updateOthers"));
    dispatch(setIsAddressEdit(true));
    console.log("update code called", id);
    const res = await dispatch(fetchContactById({ contactId: id }));
    const address = res?.payload?.data;
    setUserDetail(address);
    setIsModalVisible(true);
    selector.activeTab === "address"
      ? setModalData("updateContactForm")
      : setModalData("updateOthers");
  };

  const personDetails = {
    title: "Personal",
    rows: [
      {
        name: "Salutation",
        value: user?.saluation || "",
      },
      {
        name: "First Name",
        value: user?.firstName || "",
      },
      {
        name: "Middle Name",
        value: user?.middleName || "",
      },
      {
        name: "Last Name",
        value: user?.lastName || "",
      },
      {
        name: "Date of Birth",
        value: user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      },
    ],
  };

  const officialDetails = {
    title: "Official",
    rows: [
      {
        name: "Employee ID",
        value: user?.employeeId || "",
      },
      {
        name: "Employee Type",
        value: user?.employeeType || "",
      },
      {
        name: "Category",
        value: user?.category || "",
      },
      {
        name: "Status",
        value: user?.status || "",
      },
      {
        name: "Designation",
        value: user?.designation || "",
      },
      {
        name: "Division",
        value: user?.division || "",
      },
      {
        name: "Tax Processor",
        value: user?.taxProcessor || "",
      },
      {
        name: "Date of Joining",
        value: user?.dateOfJoining ? user.dateOfJoining.split("T")[0] : "",
      },
      {
        name: "PF Join Date",
        value: user?.pfJoinDate ? user.pfJoinDate.split("T")[0] : "",
      },
      {
        name: "Date of Confirmation",
        value: user?.dateOfConfirmation
          ? user.dateOfConfirmation.split("T")[0]
          : "",
      },
    ],
  };

  const fetchDetails = useCallback(async () => {
    try {
      const res = await dispatch(fetchUserDetails());
      const details = res?.payload?.data || [];
      const filteredUsers = details.filter(
        (item) => item._id === selector.userLoginId
      );
      await dispatch(setUserData(filteredUsers));
      console.log("Filtered Users:", filteredUsers);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false); // Set loading to false once data is fetched
    }
  }, [dispatch, selector.userLoginId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (isLoading) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <h1 className="text-2xl text-blue-950 text-left ml-10 font-bold">
          Employee Details
        </h1>
        {selector.role === "User" && (
          <div className="flex">
            <button
              className="p-2 mx-2 mr-10  bg-blue-700 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-auto"
              onClick={() =>
                selector.contactId === "updateContactForm"
                  ? handleContactEdit(userid)
                  : handleEdit(userid)
              }
            >
              Edit
            </button>
          </div>
        )}

        {user ? (
          <>
            <Table data={personDetails} />
            <Table data={officialDetails} />
          </>
        ) : (
          <div>No user data available.</div>
        )}
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        data={modalData}
        userData={userDetail}
      />
    </div>
  );
};

export default Page;
