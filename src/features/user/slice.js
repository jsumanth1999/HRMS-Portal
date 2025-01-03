import { createSlice } from "@reduxjs/toolkit";
import {
  createUserDetails,
  deleteUser,
  fetchUserById,
  fetchUserDetails,
  updateUser,
} from "./thunks";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  userDetails: [],
  userSelectedId: null,
  formId: null,
  userSelectedId: null,
  userLoginId:null,
  isLoggedIn: false,
  userdata:null,
  role:null,
  passwordId:null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFormId: (state, action) => {
      state.formId = action.payload;
    },
    setUserSelectedId: (state, action) => {
      state.userSelectedId = action.payload;
    },
    setUserLoginID: (state,action) => {
      state.userLoginId = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserData : (state, action) => {
      state.userdata = action.payload;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    setPasswordId: (state, action) => {
      state.passwordId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      //Create User
      .addCase(createUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //Get User Details
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = true;
        state.userDetails = action.payload;
      })

      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })

      //Get User Details By ID
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.userSelectedId = null;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userSelectedId = action.payload;
      })

      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.userSelectedId = action.payload;
      })

      //update User
      .addCase(updateUser.pending, (state, payload) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, payload) => {
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
      })

      //delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setFormId, setUserSelectedId, setIsLoggedIn, setUserLoginID, setUserData, setUserRole, setPasswordId } = userSlice.actions;

export default userSlice.reducer;
