
import React, { useEffect, useState } from "react";
import ContactTable from "./ContactTable";
import { formDetails, otherDetails } from "@/utils/personDetails";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setOtherId, setTab } from "@/features/contacts/slice";
import { handleListContacts } from "@/utils/handleListUser";

const Tab = (props) => {
  const [activeTab, setActiveTab] = useState("address");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await handleListContacts(dispatch);
      const contacts = data?.response || [];
      const mergeData = [];
      
      contacts.forEach((element) => {
        const { _id, address, others } = element;
        if (activeTab === "address" && address) {
          dispatch(setOtherId(null));
          dispatch(setOtherId(null))
          mergeData.push({...address, _id}); 
        } else if (activeTab === "others" && others) {
          dispatch(setOtherId("updateOthers"))
          mergeData.push({...others, _id}); 
        }
      });
      const details = {
        title: activeTab === "address" ? "Contact Information" : "Others Information",
        columns:
          activeTab === "address"
            ? ["Address Type", "Address Line1", "Address Line2", "City", "State", "Country", "Postal Code", "Actions"]
            : ["Contact Type", "Channel Type", "Value", "Actions"],
        rows: mergeData.map((user) => ({
          _id: user._id,
          values:
            activeTab === "address"
              ? [
                  user.addressType,
                  user.addressLine1,
                  user.addressLine2,
                  user.city,
                  user.state,
                  user.country,
                  user.postalCode,
                ]
              : [user.contactType, user.channelType, user.value ],
        })),
      };
      setUserData(details);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    fetchContacts();
  }, [activeTab]);

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    await dispatch(setTab(tab));
  };

  const openModal = (formData) => {
    dispatch(setOtherId(null));
    (activeTab === "address") ? setModalData(formData) : setModalData("")
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalData(null);
  };

  const getActiveTab = (name) => {
    switch (name) {
      case "address":
      case "others":
        return (
          <div className="mt-5">
            <div className="p-4 text-gray-700">
              <div className="flex flex-row justify-end">
                <button
                  onClick={() =>
                    openModal(name === "address" ? formDetails : otherDetails)
                  }
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  {`Add ${name === "address" ? "Address" : "Other"} Details`}
                </button>
              </div>
              <ContactTable data={userData} />
            </div>
          </div>
        );
      default:
        return (
          <div className="mt-5">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <p className="text-gray-500">
                No data available for the selected tab.
              </p>
            )}
          </div>
        );
    }
  };

  const tabData = props.data;

  return (
    <div>
      <div className="m-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {tabData.tabs.map((item) => (
            <li key={item.id} className="me-2">
              <a
                href="#"
                onClick={() => handleTabClick(item.id)}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === item.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600"
                } hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-400 dark:hover:border-gray-500`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">{getActiveTab(activeTab)}</div>
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        data={modalData}
        reloadData={fetchContacts}
      />
    </div>
  );
};

export default Tab;
