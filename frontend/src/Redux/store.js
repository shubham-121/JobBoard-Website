import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./Slices/authSlice";
import notificationReducer from "./Slices/notificationSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    notification: notificationReducer,
  },
});

export default store;
