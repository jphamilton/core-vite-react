import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import store from '@/app/store';

function getToken() {
  const state = store.getState();
  return state.app.token;
}

function getErrorResult<T>(error: string): ErrorResult<T> {
  return {
    success: false,
    errors: [error],
    result: null
  }
}

function request<T>(config: AxiosRequestConfig): StandardPromise<T> {
  return axios(config).then(response => {
    return response.data as StandardResult<T>
  }).catch((err: AxiosError<ErrorResult<T>,void>) => {
    if (err.response?.status === 401) {
      return getErrorResult('You are not authorized.');
    }
    return getErrorResult('An unknown error has occurred.')  });
}

function config(method: string): AxiosRequestConfig {
  const token = getToken();
  
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && {'Authorization': `Bearer ${token}`})
    }
  }
}

export async function post<T>(url: string, data: any): StandardPromise<T> {
  return request({...config('POST'), 
    url,
    data 
  });
}

export async function get<T>(url: string): StandardPromise<T> {
  return request({...config('GET'), 
    url,
  });
}

