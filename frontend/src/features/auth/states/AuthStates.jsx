import { createSlice } from "@reduxjs/toolkit";
import {
  getMeThunk,
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerApiThunk,
} from "../apis/AuthApis.thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    accessToken: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerApiThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerApiThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        ((state.user = action.payload.data.user),
          (state.accessToken = action.payload.data.accessToken));
      })
      .addCase(registerApiThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMeThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoading = false;
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        console.log(action.payload)
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.accessToken = null;
      })
      .addCase(loginThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled , (state , action)=>{
        state.user = null 
        state.accessToken = null
      })
  },
});

export default authSlice.reducer;
