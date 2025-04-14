import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
      console.log("Modal Slice is working ", state.isModalOpen);
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export default modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;
