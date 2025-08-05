import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types";
import { orderAPI } from "../../services/api";

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  selectedOrder: Order | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await orderAPI.getAll();
  return response.data;
});

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: {
    paymentType: string;
    orderItems: Array<{ productId: number; quantity: number }>;
  }) => {
    const response = await orderAPI.create(orderData);
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create order";
      });
  },
});

export const { setSelectedOrder, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;
