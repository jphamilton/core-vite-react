import { useEffect, useState } from 'react';


export function useApiAsync<T>(api: StandardApiCall<T>): ApiAsyncResult<T> {

  const [result, setResult] = useState<T>(null as T);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  async function fetch() {

    let resolved = false;

    try {

      // avoid triggering the loader if the call is fast
      setTimeout(() => {
        if (!resolved) {
          setLoading(true);
        }
      }, 500);

      const response = await api();

      resolved = true;

      if (response.success) {
        setResult(response.result)
      }

      if (response.error) {
        setError(response.error);
      }
    } catch (e: any) {

      setError(e);

    } finally {

      setReady(true);

      setLoading(false);

    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return { result, error, loading, ready } as ApiAsyncResult<T>;
}
