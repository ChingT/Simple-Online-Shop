import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    email: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
      console.log("setEmail", action.payload);
    },
  },
});

export const { setEmail } = registrationSlice.actions;
export default registrationSlice.reducer;
