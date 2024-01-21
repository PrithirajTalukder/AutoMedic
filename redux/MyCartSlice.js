// Assuming your cart slice has actions like these
// myCartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProductToMyCart: (state, action) => {
      state.push(action.payload);
    },
    removeProductFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    updateProductQuantity: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addProductToMyCart, removeProductFromCart, updateProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;




