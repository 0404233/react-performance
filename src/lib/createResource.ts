export function createResource<T>(promiseFactory: () => Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T | undefined;
  let error: unknown;

  const suspender = promiseFactory()
    .then((res) => {
      status = 'success';
      result = res;
    })
    .catch((err: unknown) => {
      status = 'error';
      error = err;
    });

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      }
      if (status === 'error') {
        throw error;
      }
      return result as T;
    }
  };
}
