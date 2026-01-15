import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity < action.payload.stock) {
          existingItem.quantity += 1;
        }
      } else {
        if (action.payload.stock > 0) {
          state.items.push({ product: action.payload, quantity: 1 });
        }
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== productId
          );
        } else if (quantity <= item.product.stock) {
          item.quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
