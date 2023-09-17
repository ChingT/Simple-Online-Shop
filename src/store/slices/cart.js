import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    itemsArray: [],
  },
  reducers: {
    addOneItem: (state, action) => {
      const productID = action.payload;
      if (state.items[productID]) state.items[productID] += 1;
      else state.items[productID] = 1;
      state.itemsArray = Object.entries(state.items);
    },
    removeOneItem: (state, action) => {
      const productID = action.payload;
      if (state.items[productID]) state.items[productID] -= 1;
      if (state.items[productID] === 0) delete state.items[productID];
      state.itemsArray = Object.entries(state.items);
    },
    deleteItem: (state, action) => {
      const productID = action.payload;
      delete state.items[productID];
      state.itemsArray = Object.entries(state.items);
    },
  },
});

export const { addOneItem, removeOneItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
