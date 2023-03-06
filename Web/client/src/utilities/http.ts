
export async function get<T>(url: string): Promise<StandardResult<T>> {
  try {

    const response = await fetch(url);

    if (!response.ok) {
      let text = await response.text();
      text = parseException(text);
      return getErrorResult(text);
    }

    const result: StandardResult<T> = await response.json();

    if (!result.success) {
      console.error(result.error || 'Unknown error occurred');
    }

    return result;

  } catch (err) {

    console.log('Server error:', err);

    return getErrorResult(err as string);
  }
}

function getErrorResult<T>(err: string) {
  const d: StandardResult<T> = {
    success: false,
    error: err as string,
    result: null as T
  };

  console.log('error', d);

  return d;
}

function parseException(ex: string) {
  return ex.substring(0, ex.indexOf('\r\n')).substring(ex.indexOf(' ') + 1);
}
