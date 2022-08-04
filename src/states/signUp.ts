import {createSlice } from '@reduxjs/toolkit';

const signUpStep = createSlice({
  name:'steps',
  initialState: {
    value:0,
  },
  reducers:{
    nextStep: (state) => {
      state.value +=1;
    },
    prevStep: (state) => {
      state.value -=1;
    },
    customStep: (state,action) => {
      state.value = action.payload;
    }
  }
});

export const {nextStep,prevStep,customStep} = signUpStep.actions;
export default signUpStep.reducer;