import { createSlice } from '@reduxjs/toolkit';

const filterDialog = createSlice({
  name:'searchBar',
  initialState: {
    value: false,
  },
  reducers: {
    show: (state) => {
      state.value = true;
    },
    close: (state) => {
      state.value = false;
    }
  }
});

export const {show,close} = filterDialog.actions;
export default filterDialog.reducer;