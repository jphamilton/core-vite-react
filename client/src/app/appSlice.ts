import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { v4 as uuidv4 } from 'uuid';

type AppState = {
  errors: string[];
  loading: boolean;
  toasts: Toast[];
};

const initialState: AppState = {
  errors: [],
  loading: false,
  toasts: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    errors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toast: (state, action: PayloadAction<Toast>) => {
      const toast = action.payload;
      toast.id = uuidv4();
      state.toasts.push(action.payload);
    },
    closeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(x => x.id !== action.payload);
    }
  }
});

export const { errors, loading, toast, closeToast } = appSlice.actions;

export const selectLoading = (state: RootState) => state.app.loading;
export const selectErrors = (state: RootState) => state.app.errors;
export const selectToasts = (state: RootState) => state.app.toasts;

export default appSlice.reducer;