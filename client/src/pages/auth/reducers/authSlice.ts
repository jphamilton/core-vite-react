import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

type Login = {
  email: string;
  password: string;
};

type Registration = {
  email: string;
  password: string;
  confirm: string;
};

type AuthState = {
  login: Login;
  registration: Registration;
};

const initialState: AuthState = {
  login: {
    email: '',
    password: ''
  },
  registration: {
    email: '',
    password: '',
    confirm: ''
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLogin: (state, action: PayloadAction<Partial<Login>>) => {
      Object.assign(state.login, action.payload);
    },
    updateRegistration: (state, action: PayloadAction<Partial<Registration>>) => {
      Object.assign(state.registration, action.payload);
    }
  }
});

export const { updateLogin } = authSlice.actions;
export const { updateRegistration } = authSlice.actions;

export const selectRegistration = (state: RootState) => state.auth.registration;
export const selectLogin = (state: RootState) => state.auth.login;

export default authSlice.reducer;