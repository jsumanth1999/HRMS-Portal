"use client";

import React from "react";
import Tab from "@/components/Tab";
import { tabData } from "@/utils/data";
import { useDispatch } from "react-redux";
import { setContactId } from "@/features/contacts/slice";
import Sidebar from "@/components/Sidebar";

const page = () => {
  const dispatch = useDispatch();
  dispatch(setContactId("updateContactForm"));
  return (
    <div className="p-4 sm:ml-64">
      <Sidebar />
      <Tab data={tabData} />
    </div>
  );
};

export default page;
