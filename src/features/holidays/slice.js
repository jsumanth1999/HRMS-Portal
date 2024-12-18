import { createSlice } from "@reduxjs/toolkit";
import {
  createHoliday,
  deleteHoliday,
  fetchHolidayById,
  fetchHolidays,
  updateHoliday,
} from "./thunks";

const initialState = {
  isLoading: false,
  error: null,
  holidaysList: [],
  holidaySelectedId: null,
  holidayId: null,
  year: null,
  yearsList: [],
};

export const holidaySlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    setHolidayForm: (state, action) => {
      state.holidayId = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setYearsList: (state, action) => {
      state.yearsList.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      //Fetch Holidays
      .addCase(fetchHolidays.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.holidaysList = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //Create Holiday
      .addCase(createHoliday.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHoliday.fulfilled, (state, action) => {
        state.isLoading = true;
        state.holiday = action.payload;
      })
      .addCase(createHoliday.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })

      //Get Holiday By ID
      .addCase(fetchHolidayById.pending, (state) => {
        state.isLoading = true;
        state.holidaySelectedId = null;
      })
      .addCase(fetchHolidayById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.holidaySelectedId = action.payload;
      })
      .addCase(fetchHolidayById.rejected, (state, action) => {
        state.isLoading = false;
      })

      //Update Holiday
      .addCase(updateHoliday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHoliday.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateHoliday.rejected, (state) => {
        state.isLoading = false;
      })

      //Delete Holiday
      .addCase(deleteHoliday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHoliday.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteHoliday.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setHolidayForm , setYear, setYearsList } = holidaySlice.actions;

export default holidaySlice.reducer;
