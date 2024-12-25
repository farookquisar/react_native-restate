import { useState, useEffect } from 'react';

interface UseSupabaseOptions<T, P> {
  fn: (params: P) => Promise<T[]>;
  params?: P;
  dependencies?: any[];
}

interface UseSupabaseResult<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSupabase<T, P>({ 
  fn, 
  params, 
  dependencies = [] 
}: UseSupabaseOptions<T, P>): UseSupabaseResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fn(params as P);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [...dependencies]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
