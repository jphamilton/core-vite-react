import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { v4 as uuidv4 } from 'uuid';

type AppState = {
  userName: string;
  email: string;
  token: string | null;
  registered: boolean;
  errors: string[];
  loading: boolean;
  toasts: Toast[];
};

const initialState: AppState = {
  registered: false,
  userName: '',
  email: '',
  token: null,
  errors: [],
  loading: false,
  toasts: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<LoginResponse>) => {
      const { email, userName, token } = action.payload;
      state.email = email;
      state.userName = userName;
      state.token = token;
    },
    registered: (state, action: PayloadAction<boolean>) => {
      state.registered = action.payload;
    },
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

const toast = createAction('app/toast', (message: string, type: ToastType ) => {
  return {
    payload: {
      message,
      type
    }
  }
});

export { toast };

export const { errors, loading, loggedIn, registered } = appSlice.actions;

export const selectUser = (state: RootState) => ({
  email: state.app.email,
  userName: state.app.userName,
  token: state.app.token
});

export const selectRegistered = (state: RootState) => state.app.registered;
export const selectLoading = (state: RootState) => state.app.loading;
export const selectErrors = (state: RootState) => state.app.errors;
export const selectToasts = (state: RootState) => state.app.toasts;

export default appSlice.reducer;