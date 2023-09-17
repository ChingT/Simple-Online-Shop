import { createSlice } from "@reduxjs/toolkit";

const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    products: {},
  },
  reducers: {
    addProducts: (state, action) => {
      const newProducts = Object.fromEntries(
        action.payload.map((product) => [product.id, product])
      );
      Object.assign(state.products, newProducts);
    },
  },
});

export const { addProducts } = catalogSlice.actions;
export default catalogSlice.reducer;
