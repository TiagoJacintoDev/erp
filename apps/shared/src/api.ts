export type Error = {
  name: string;
};

export type SuccessResponse<T> = { success: true; data?: T };
export type ErrorResponse<T extends Error = Error> = { success: false; error: T };

export type ValidationErrorDefinition = {
  name: 'ValidationError';
  errors: {
    path: (string | number)[];
    message: string;
  }[];
};

export type ValidationErrorResponse = ErrorResponse<ValidationErrorDefinition>;
