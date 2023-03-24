import { get } from '@/utilities/http';

export const getLatestValues = async () => {
  return new Promise<StandardResult<TelemetryData[]>>(resolve => {

    // simulate delay to test loader
    setTimeout(async () => {

      const response = await get<TelemetryData[]>('/api/telemetry');

      resolve(response);

    }, 1000);

  });
  
}