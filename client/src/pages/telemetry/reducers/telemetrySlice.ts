import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

type TelemetryState = {
  data: TelemetryData[];
};

const initialState: TelemetryState = {
  data: []
};

const telemetrySlice = createSlice({
  name: 'telemetry',
  initialState,
  reducers: {
    telemetryReceived: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { telemetryReceived } = telemetrySlice.actions;

export const selectTelemetry = (state: RootState) => state.telemetry.data;

export default telemetrySlice.reducer;