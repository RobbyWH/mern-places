import React from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const activeHttpRequest = React.useRef<Array<any>>([]);

  const sendRequest = React.useCallback(async (
    url: string, 
    method: string = 'GET',
    body: any = null,
    headers: any= {}
  ) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequest.current.push(httpAbortCtrl);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      })
  
      const responseData = await response.json();

      activeHttpRequest.current = activeHttpRequest.current.filter(
        reqCtrl => reqCtrl !== httpAbortCtrl
      );

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError('');
  };

  React.useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError
  };
}