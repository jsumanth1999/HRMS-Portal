import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  "fetchContacts",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/contact", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "An error occured"
      );
    }
  }
);

export const createContact = createAsyncThunk(
  "createContact",
  async (body, { fulfillWithValue, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/contact", body, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "An Error Occured While Creating Contact"
      );
    }
  }
);

export const fetchContactById = createAsyncThunk(
  "fetchContactById",
  async ({ contactId = "" }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/contact/${contactId}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "updateContact",
  async ({ contactId = "", body }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`/api/contact/${contactId}`, body, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return (
        rejectWithValue(error?.response?.data?.message) ||
        "An Error Occured While Updating the Contact"
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  "deleteContact",
  async ({ contactId = "" }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`/api/contact/${contactId}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "An Occured While Deleting the Contact"
      );
    }
  }
);
