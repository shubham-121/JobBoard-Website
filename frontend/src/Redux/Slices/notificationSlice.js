import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNotification: false,
  notificationMsg: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.isNotification = true;
      state.notificationMsg = action.payload;
    },

    clearNotification(state) {
      state.isNotification = false;
      state.notificationMsg = "";
    },
  },
});

export default notificationSlice.reducer;

export const { clearNotification, setNotification } = notificationSlice.actions;
