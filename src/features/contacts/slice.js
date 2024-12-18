import {
  createContact,
  deleteContact,
  fetchContactById,
  fetchContacts,
  updateContact,
} from "./thunks";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  error: null,
  contactsList: [],
  contactSelectedId: null,
  activeTab: "address",
  contactId: null,
};

const contactSlice = createSlice({
  name: "ContactDetails",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setContactId : (state, action) => {
      state.contactId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //List of Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactsList = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.contactsList = action.payload;
      })

      //create Contact
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createContact.rejected, (state) => {
        state.isLoading = false;
      })

      //Fetch Contact By ID
      .addCase(fetchContactById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactSelectedId = action.payload;
      })
      .addCase(fetchContactById.rejected, (state) => {
        state.isLoading = false;
      })

      //Update Contact
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateContact.rejected, (state) => {
        state.isLoading = false;
      })

      //Delete Contact
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setTab, setContactId } = contactSlice.actions;

export default contactSlice.reducer;
