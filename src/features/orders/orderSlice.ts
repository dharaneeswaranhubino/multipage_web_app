import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  user: string;
}

interface OrderState {
  orders: OrderItem[];
}

const initialState: OrderState = {
  orders: JSON.parse(localStorage.getItem("orders") || "[]"),
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderItem[]>) => {
      state.orders = [...state.orders, ...action.payload];
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    cancelOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder, cancelOrder } = orderSlice.actions;
export default orderSlice.reducer;