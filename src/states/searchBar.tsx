import { createSlice } from '@reduxjs/toolkit';

const searchBar = createSlice({
  name:'searchBar',
  initialState: {
    value: 'none',
  },
  reducers: {
    showSearch: (state) => {
      state.value = 'block';
    },
    closeSearch: (state) => {
      state.value = 'none';
    }
  }
});

export const {showSearch,closeSearch} = searchBar.actions;
export default searchBar.reducer;