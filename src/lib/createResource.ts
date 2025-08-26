export function createResource<T>(asyncFn: () => Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: unknown;
  const suspender = asyncFn()
    .then((r) => {
      status = 'success';
      result = r;
    })
    .catch((e) => {
      status = 'error';
      error = e;
    });

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      return result!;
    }
  };
}