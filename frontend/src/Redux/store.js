import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./Slices/authSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;
