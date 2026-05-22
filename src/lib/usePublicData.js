import { useEffect, useState } from 'react';
import { fetchPublic } from './api';

export function usePublicData(path, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchPublic(path, fallback).then((result) => {
      if (alive) {
        setData(result?.length === 0 ? fallback : result);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [path]);

  return { data, loading };
}
