import { createSlice } from '@reduxjs/toolkit';

export const cartItems = createSlice({
  name: 'cart',
  initialState: {
    value:0,
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    remove: (state) => {
      state.value -=1;
    },
    addByProduct: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const {add, remove,addByProduct} = cartItems.actions;
export default cartItems.reducer;