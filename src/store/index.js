import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import catalogReducer from "./slices/catalog";
import userReducer from "./slices/user";

const store = configureStore({
  reducer: {
    user: userReducer,
    catalog: catalogReducer,
    cart: cartReducer,
  },
});

export default store;
