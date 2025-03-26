import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  access_token: "",
  refresh_token: "",
  authUserData: {}, //store user details data for authenticated user
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      console.log("Set access token reducer called: ", action.payload);
      state.isAuthenticated = true;
      state.access_token = action.payload;
      state.authUserData = action.payload;

      console.log(" access token set: ", state.access_token);
    },

    setRefreshToken(state, action) {
      console.log("Set refresh token reducer called: ", action.payload);
      state.isAuthenticated = true;
      state.refresh_token = action.payload;
      state.authUserData = action.payload;
    },

    clearToken(state) {
      state.isAuthenticated = false;
      state.access_token = "";
      state.refresh_token = "";
      state.authUserData = {};
    },
  },
});

export default authSlice.reducer;

export const { setAccessToken, setRefreshToken, clearToken } =
  authSlice.actions;
