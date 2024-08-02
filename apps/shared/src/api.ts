export type Error<T extends string> = {
  name: T;
  message?: string;
};

export type SuccessResponse<T> = { data?: T };
export type ErrorResponse<T extends Error<string> = Error<string>> = { error: T };

export type ValidationErrorDefinition = {
  name: 'ValidationError';
  errors: {
    path: (string | number)[];
    message: string;
  }[];
};

export type ValidationErrorResponse = ErrorResponse<ValidationErrorDefinition>;

export type ApiErrorDefinition = {
  name: 'ApiError';
  message: string;
};

export type ApiErrorResponse = ErrorResponse<ApiErrorDefinition>;
