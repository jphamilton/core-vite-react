import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

type CounterState = {
  value: number
};

const initialState: CounterState = {
  value: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  }
});

export const { increment } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;