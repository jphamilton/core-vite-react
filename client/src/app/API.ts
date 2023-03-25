import { get, post } from '@/utilities/http';

export const latestValues = async () => {
  return new Promise<StandardResult<TelemetryData[]>>(resolve => {
    // simulate delay to test loader
    setTimeout(async () => {
      const response = await get<TelemetryData[]>('/api/telemetry');
      resolve(response);
    }, 1000);
  });
}

export const register = async (email: string, userName: string, password: string): StandardPromise<void> => {
  return await post<void>('/api/auth/register', { email, userName, password});
}

export const login = async (email: string, password: string): Promise<StandardResult<LoginResponse|void>> => {
  return await post('/api/auth/login', { email, password});
}