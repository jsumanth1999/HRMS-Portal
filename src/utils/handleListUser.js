import { fetchContacts } from "@/features/contacts/thunks";
import { setYearsList } from "@/features/holidays/slice";
import { fetchHolidays } from "@/features/holidays/thunks";
import { fetchUserDetails } from "@/features/user/thunks";
import { useSelector } from "react-redux";

export const handleListUser = async (dispatch) => {
  try {
    const response = await dispatch(fetchUserDetails());
    const userDetails = response?.payload?.data;

    if (userDetails) {
      console.log("User Details", userDetails);
      return {
        title: "User Details",
        columns: ["ID", "First Name", "Last Name", "Email Id", "Role"],
        rows: userDetails.map((user) => ({
          _id: user._id,
          values: [
            user.employeeId,
            user.firstName,
            user.lastName,
            user.email,
            user.role,
          ],
        })),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const handleListHolidays = async (dispatch) => {
  try {
    const response = await dispatch(fetchHolidays());
    const holidayDetails = response?.payload?.data;

    if (holidayDetails) {
      const uniqueYears = [
        ...new Set(holidayDetails.map((holiday) => holiday.year)),
      ];
      const sortedYears = uniqueYears.sort((a, b) => a - b);
      dispatch(setYearsList(sortedYears));
    }

    if (holidayDetails) {
      const groupedHolidays = holidayDetails.reduce((acc, holiday) => {
        const year = holiday.year;
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push({
          _id: holiday?._id,
          title: holiday?.title,
          date: holiday?.date,
          holidayType: holiday?.holidayType,
          alternateWorkingDate: holiday?.alternateWorkingDate || "0000-00-00",
        });
        return acc;
      }, {});

      return {
        title: "Holidays Details",
        columns: [
          "Title",
          "Date",
          "Holiday Type",
          "Alternate Working Date",
          "Actions",
        ],
        holidays: groupedHolidays,
      };
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const handleListContacts = async (dispatch) => {
  try {
    const response = await dispatch(fetchContacts());
    console.log(response);
    return response?.payload;
  } catch (error) {
    console.error("Error fetching contact details:", error);
  }
}


export const handleSelectedId = async (data) => {
  return data;
};
