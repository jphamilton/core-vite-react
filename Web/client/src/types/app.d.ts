type StandardResult<T> = {
  success: boolean;
  result: T;
  error: string;
}

type StandardPromise<T> = Promise<StandardResult<T>>;
type StandardApiCall<T> = (...args: any) => StandardPromise<T>;

type ApiAsyncResult<T> = {
  result: T;
  error: string | null;
  loading: boolean;
  ready: boolean;
  setResult: (result: T) => void;
};
