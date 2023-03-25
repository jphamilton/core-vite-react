import { configureStore, AnyAction, ThunkAction } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import counterReducer from '@/pages/home/reducers/counterSlice';
import telemetryReducer from '@/pages/telemetry/reducers/telemetrySlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    telemetry: telemetryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export default store;