import { useEffect, useState } from 'react';

export default function useStickyState<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stickyVal = localStorage.getItem(key);
      return stickyVal !== null ? JSON.parse(stickyVal) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
}