import { configureStore } from "@reduxjs/toolkit";
import MyProductReducer from "../redux/MyProductSlice";
import MyCartReducer from "../redux/MyCartSlice"

export const mystore = configureStore({
  reducer: {
    product: MyProductReducer,
    cart: MyCartReducer,
  },
});
