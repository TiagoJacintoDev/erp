import { type SignupDTO } from '@sms/shared/src/modules/users/signup/signup.dto';
import axios, { type AxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Accept-Language': 'pt-PT',
  },
});

export type SuccessResponse<T> = { success: true; data: T };
export type ErrorResponse = { success: false; error: string };

export type ApiError = AxiosError<ErrorResponse | NonNullable<unknown>>;

type ErrorHandlingOptions = {
  error: ApiError;
  onNetworkError: () => void;
  onServerError: () => void;
  onExpectedError: (error: ErrorResponse['error']) => void;
};

export function handleError({
  error,
  onNetworkError,
  onServerError,
  onExpectedError,
}: ErrorHandlingOptions) {
  if (!error.response) return onNetworkError();

  if (!(typeof error.response.data === 'object' && 'error' in error.response.data))
    return onServerError();

  onExpectedError(error.response.data.error);
}

export const api = {
  async signup(data: SignupDTO) {
    await instance.post('/users', data);
  },
};
