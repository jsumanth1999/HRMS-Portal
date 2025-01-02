"use client";
import Table from "@/components/Table";
import React, { useEffect, useCallback, useState } from "react";
import { fetchUserDetails } from "@/features/user/thunks";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/features/user/slice";
import Sidebar from "@/components/Sidebar";

const Page = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const user = selector?.userdata[0];
  const [isLoading, setIsLoading] = useState(true);

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
        value: user?.dateOfConfirmation ? user.dateOfConfirmation.split("T")[0] : "",
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
      <h1 className="text-2xl text-blue-950 text-left ml-10 font-bold">Employee Details</h1>
        {user ? (
          <>
            <Table data={personDetails} />
            <Table data={officialDetails} />
          </>
        ) : (
          <div>No user data available.</div>
        )}
      </div>
    </div>
  );
};

export default Page;
