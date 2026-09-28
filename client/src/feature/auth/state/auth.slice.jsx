import { createSlice } from "@reduxjs/toolkit";
import { getMe, loginUser, logoutUser, registerUser } from "./authAction.jsx";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isloading: false,
    isAuthenticat: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticat = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isloading = false;
        ((state.error = action.payload.errors), (state.user = null));
        state.isAuthenticat = false;
        state.accessToken = null;
      })
      .addCase(getMe.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isloading = false;
        state.user = action.payload.data.user;
        state.isAuthenticat = true;
        state.error = null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
        state.isAuthenticat = false;
      })
      .addCase(loginUser.pending, (state) => {
        ((state.isloading = true), (state.error = null));
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        ((state.isloading = false), (state.user = action.payload.data.user));
        ((state.accessToken = action.payload.data.accessToken),
          (state.isAuthenticat = true),
          (state.error = null));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isloading = false;
        state.user = null;
        state.error = action.payload;
        state.isAuthenticat = false;
        state.accessToken = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isloading = true;
        state.error = null;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticat = false;
      state.isloading = false;
      state.error = null;
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    });
  },
});
export default authSlice.reducer;
