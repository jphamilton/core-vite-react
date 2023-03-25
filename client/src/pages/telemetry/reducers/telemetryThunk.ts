import type { AppThunk } from '@/app/store';
import * as API from '@/app/API';
import { loading, toast } from '@/app/appSlice';
import { telemetryReceived } from './telemetrySlice';

export { telemetryReceived };

// lasted values as thunk (not used here)
//
// use RTK Query in real life...
// and don't dispatch toasts from thunks
// and don't do this
export const latestValues = (): AppThunk => {
    return async dispatch => {
      try {
  
        let loaded = false;
  
        // prevent loader flashing
        setTimeout(() => {
          if (!loaded) {
            dispatch(loading(true));
          }
        }, 500);
  
        const response = await API.latestValues();
  
        loaded = true;
  
        dispatch(loading(false));
  
        if (response.success) {
          dispatch(telemetryReceived(response.result));
        }
  
        response.errors.forEach(error => {
            dispatch(toast(error, 'error'));
        });

      } catch (err) {
        console.error(err);
      }
    }
  }