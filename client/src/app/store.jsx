import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/state/auth.slice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

