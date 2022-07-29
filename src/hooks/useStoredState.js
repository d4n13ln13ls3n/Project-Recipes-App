import { useState, useEffect } from 'react';

export default function useStoredState(storageKey, fallbackValue) {
  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || fallbackValue;
    } catch {
      return fallbackValue;
    }
  });

  useEffect(() => {
    localStorage.removeItem(storageKey);
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [storageKey, data]);

  return [data, setData];
}
