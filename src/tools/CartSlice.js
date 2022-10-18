import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  auth: "",
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex < 0) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      } else {
        state.cartItems[itemIndex].quantity += 1;
      }
    },

    decreaseProductFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
        }
      }
    },

    removeProductFromCart(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItem;
    },

    makeEmptyCart(state) {
      state.cartItems = [];
    },

    setToken(state, action) {
      state.auth = action.payload;
    },

    removeToken(state) {
      state.auth = "";
      state.cartItems = [];
    },
  },
});

export const {
  addProductToCart,
  decreaseProductFromCart,
  removeProductFromCart,
  makeEmptyCart,
  setToken,
  removeToken,
} = CartSlice.actions;
export default CartSlice.reducer;
