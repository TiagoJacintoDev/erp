export type EndpointResponse<TData = unknown, TError = unknown> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: TError | DefaultAPIErrorCode;
    };

export const enum DefaultAPIErrorCode {
  ValidationError = 'ValidationError',
  ServerError = 'ServerError',
  UnexpectedError = 'UnexpectedError',
}

export function createAPIClient(apiUrl: string) {
  return {};
}

export type Api = ReturnType<typeof createAPIClient>;
