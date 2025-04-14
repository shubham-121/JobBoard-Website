import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./Slices/authSlice";
import notificationReducer from "./Slices/notificationSlice";
import modalReducer from "./Slices/modalSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    notification: notificationReducer,
    modal: modalReducer,
  },
});

export default store;
