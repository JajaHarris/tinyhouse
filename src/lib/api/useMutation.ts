import { useState } from 'react';
import { server } from './server';
import { AppState } from '../../sections/Shared';

type Result<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  AppState<TData>
];

export const useMutation = <TData = any, TVariables = any>(
  query: string
): Result<TData, TVariables> => {
  const [state, setState] = useState<AppState<TData>>(new AppState<TData>());

  const fetch = async (variables?: TVariables) => {
    try {
      setState(AppState.forLoading<TData>());
      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables,
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }

      setState({ data, loading: false, error: false });
    } catch (err) {
      setState(AppState.forError<TData>());
      throw console.error(err);
    }
  };

  return [fetch, state];
};
