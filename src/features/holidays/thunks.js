import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHolidays = createAsyncThunk(
  "fetchHolidays",
  async (_, { fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/holidays", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An Error occured"
      );
    }
  }
);

export const createHoliday = createAsyncThunk(
  "createHoliday",
  async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/holidays", body, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const fetchHolidayById = createAsyncThunk(
    "FetchHolidayById",
    async ({ holidayId = "" }, { rejectWithValue, fulfillWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/holidays/${holidayId}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        return fulfillWithValue(res.data);
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "An Error occured"
        );
      }
    }
  );

  export const updateHoliday = createAsyncThunk(
    "UpdateHoliday",
    async ({ holidayId = "", body }, { fulfillWithValue, rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`/api/holidays/${holidayId}`, body, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        return fulfillWithValue(res.data);
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "An Error occured"
        );
      }
    }
  );


  export const deleteHoliday = createAsyncThunk(
    "DeleteHoliday",
    async ({ holidayId = "" }, { rejectWithValue, fulfillWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`/api/holidays/${holidayId}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        return fulfillWithValue(res.data);
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "An error occured"
        );
      }
    }
  );

