import { createSlice } from '@reduxjs/toolkit';
import type { RootState, AppThunk } from '@/app/store';
import * as API from '@/app/API';
import { loading } from '@/app/appSlice';

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

export const latestValues = (): AppThunk => {
  return async dispatch => {
    try {

      let loaded = false;

      // don't want the loader blinking, probably a better way to do this
      setTimeout(() => {
        if (!loaded) {
          dispatch(loading(true));
        }
      }, 500);

      const response = await API.getLatestValues();

      loaded = true;

      dispatch(loading(false));

      if (response.success) {
        dispatch(telemetryReceived(response.result));
      }
    } catch (err) {
      // some kind of sweet error handling here
    }
  }
}

export default telemetrySlice.reducer;