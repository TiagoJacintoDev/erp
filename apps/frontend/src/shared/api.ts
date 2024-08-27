import {
  type ErrorResponse,
  type ValidationErrorResponse,
  type ApiErrorResponse,
} from '@sms/shared/src/api';
import { type SignupDTO } from '@sms/shared/src/modules/users/signup/signup.dto';
import {
  type QueryKey,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { type SetRequired } from 'type-fest';

import { config } from './config';

const instance = axios.create({
  baseURL: `${config.env.VITE_API_URL}/api/v1`,
  headers: {
    'Accept-Language': 'pt-PT',
  },
});

export type ApiError<T extends ErrorResponse> = AxiosError<T>;

type ErrorHandlerCallbacks<T extends ErrorResponse> = {
  onNetworkError: () => void;
  onServerError: (error: T['error']) => void;
};

type ApiMutationOptions<
  TData,
  TError extends ErrorResponse,
  TVariables,
  TContext = unknown,
> = ErrorHandlerCallbacks<TError> &
  SetRequired<UseMutationOptions<TData, ApiError<TError>, TVariables, TContext>, 'mutationFn'>;

type ApiMutationWithoutErrorHandling<
  TData,
  TError extends ErrorResponse,
  TVariables,
  TContext = unknown,
> = Omit<ApiMutationOptions<TData, TError, TVariables, TContext>, 'onError'>;

type ApiMutationEndpointOptions<
  TData,
  TError extends ErrorResponse,
  TVariables,
  TContext = unknown,
> = Omit<ApiMutationWithoutErrorHandling<TData, TError, TVariables, TContext>, 'mutationFn'>;

function useApiMutation<TData, TError extends ErrorResponse, TVariables, TContext = unknown>({
  onNetworkError,
  onServerError,
  ...options
}: ApiMutationWithoutErrorHandling<TData, TError, TVariables, TContext>) {
  return useMutation({
    onError(error) {
      if (!error.response) return onNetworkError();

      return onServerError(error.response.data.error);
    },
    ...options,
  });
}

// type ApiQueryOptions<
//   TQueryFnData,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// > = ErrorHandlerCallbacks &
//   SetRequired<UseQueryOptions<TQueryFnData, ApiError, TData, TQueryKey>, 'queryFn'>;

// type ApiQueryWithoutErrorHandling<
//   TQueryFnData,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// > = Omit<ApiQueryOptions<TQueryFnData, TData, TQueryKey>, 'onError'>;

// type ApiQueryEndpointOptions<
//   TQueryFnData,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// > = Omit<ApiQueryWithoutErrorHandling<TQueryFnData, TData, TQueryKey>, 'queryFn'>;

// function useApiQuery<TQueryFnData, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
//   options: ApiQueryWithoutErrorHandling<TQueryFnData, TData, TQueryKey>,
// ) {
//   const rest = useQuery(options);

//   const hasErrorResponse = !!rest.error?.response;

//   return {
//     isNetworkError: !hasErrorResponse,
//     isExpectedError: hasErrorResponse,
//     ...rest,
//   };
// }

export const api = {
  useSignup(
    options: ApiMutationEndpointOptions<
      void,
      ValidationErrorResponse | ApiErrorResponse,
      SignupDTO
    >,
  ) {
    return useApiMutation({
      async mutationFn(data: SignupDTO) {
        await instance.post('/users', data);
      },
      ...options,
    });
  },
  // useGetUsers(options: ApiQueryEndpointOptions<string>) {
  //   return useApiQuery({
  //     async queryFn() {
  //       const response = await instance.get<string>('/users');

  //       return response.data;
  //     },
  //     ...options,
  //   });
  // },
};
