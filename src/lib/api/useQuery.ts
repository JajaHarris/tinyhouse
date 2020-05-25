import { server } from './server';
import { useState, useEffect, useCallback } from 'react';
import { AppState } from "../../sections/Shared";

interface QueryResult<TData> extends AppState<TData> {
  refetch: () => void;
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const [state, setState] = useState<AppState<TData>>(AppState.forLoading<TData>());

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        const { data, errors } = await server.fetch<TData>({ query });

        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }

        setState({ data, loading: false, error: false });
      } catch (err) {
        setState(AppState.forError<TData>());
        throw console.error(err);
      }
    };

    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {...state, refetch: fetch};
};
