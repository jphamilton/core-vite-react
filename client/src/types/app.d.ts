type SuccessResult<T> = {
  success: true;
  result: T;
  errors: string[];
}

type ErrorResult<T> = {
  success: false;
  result: null;
  errors: string[];
}

type StandardResult<T> = SuccessResult<T> | ErrorResult<T>;
type StandardPromise<T> = Promise<StandardResult<T>>;
type StandardApiCall<T> = (...args: any) => StandardPromise<T>;

type ApiAsyncResult<T> = {
  result: T;
  error: string | null;
  loading: boolean;
  ready: boolean;
  setResult: (result: T) => void;
};

type ToastType = 'success' | 'error' | 'info' | 'warning';

type Toast = {
  id?: string;
  message: string;
  duration?: number;
  type: ToastType;
}

type LoginResponse = {
  email: string;
  userName: string;
  token: string;
}