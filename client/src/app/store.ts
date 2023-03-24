import { configureStore, AnyAction, ThunkAction } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import { counterReducer, telemetryReducer } from '@/pages/home/reducers';
import { authReducer } from '@/pages/auth/reducers';

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    counter: counterReducer,
    telemetry: telemetryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<void, RootState, unknown, AnyAction>;

export default store;