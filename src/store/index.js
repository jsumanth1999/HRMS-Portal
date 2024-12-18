import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/slice"; 
import holidayReducer from "@/features/holidays/slice"
import contactReducer from "@/features/contacts/slice"

export const store = configureStore({
  reducer: {
    user: userReducer, 
    holiday: holidayReducer,
    contact: contactReducer,
  },
});

export default store;
