import { createSlice } from '@reduxjs/toolkit';
import {getCookie} from '../assets/js/cookies.js';
var userNow
//alert(getCookie('belaiexpress'));
if(getCookie('belaiexpress')){
  userNow = getCookie('belaiexpress')
} else {
  userNow = JSON.stringify({userId:null});
}
export const user = createSlice({
  name: 'user',
  initialState: {
    value:userNow,
  },
  reducers: {
    removeUser: (state) => {
      state.value = '{userId:null}'
    },
    addUser: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const {addUser, removeUser} = user.actions;
export default user.reducer;