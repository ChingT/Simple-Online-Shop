import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import registrationReducer from "./slices/registration";

const store = configureStore({
  reducer: {
    user: userReducer,
    registration: registrationReducer,
  },
});

export default store;
