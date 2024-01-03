import { createSlice } from "@reduxjs/toolkit";

const MyProductSlice = createSlice({
    name: "product",
    initialState: [],
    reducers: {
      addMyProduct(state, action) {
        state.push(action.payload);
      },
    },
  });
  
  export const { addMyProduct } = MyProductSlice.actions;
  export default MyProductSlice.reducer;