import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserDetails = createAsyncThunk(
  "fetchUsers",
  async (_, { fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/user", {
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

export const createUserDetails = createAsyncThunk(
  "CreateUser",
  async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post("/api/user", body, {
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

export const fetchUserById = createAsyncThunk(
  "FetchUserById",
  async ({ userId = "" }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/user/${userId}`, {
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

export const updateUser = createAsyncThunk(
  "UpdateUser",
  async ({ userId = "", body }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`/api/user/${userId}`, body, {
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

export const deleteUser = createAsyncThunk(
  "DeleteUser",
  async ({ userId = "" }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`/api/user/${userId}`, {
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
