import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: undefined,
    username: undefined,
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.access;
      state.username = action.payload.user.username;
    },
    logout: (state) => {
      state.accessToken = null;
      state.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
