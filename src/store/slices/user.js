import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: undefined,
    details: null,
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.details = null;
    },
    loadUser: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { login, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
