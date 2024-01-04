import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 1,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      if (state.value < 1025) {
        state.value++;
      }
    },
    decrement: state => {
      if (state.value > 0) {
        state.value--;
      }
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // Check if the next value after adding the payload is within the allowed range
      if (state.value + action.payload <= 1025) {
        state.value += action.payload;
      } else {
        // If it exceeds the limit, set it to the maximum allowed value
        state.value = 1025;
      }
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      // Check if the next value after subtracting the payload is within the allowed range
      if (state.value - action.payload >= 1) {
        state.value -= action.payload;
      } else {
        // If it goes below the limit, set it to the minimum allowed value
        state.value = 1;
      }
    },
    reset: state => {
      state.value = 0;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;
