import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/products";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: products,
  },
  reducers: {},
});

export default productSlice.reducer;