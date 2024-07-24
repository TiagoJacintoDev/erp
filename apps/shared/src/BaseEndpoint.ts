import axios, { type AxiosInstance, type RawAxiosRequestConfig } from 'axios';

import { DefaultAPIErrorCode, type EndpointResponse } from './api';

export abstract class BaseEndpoint<TRequest, TResponse extends EndpointResponse> {
  private http: AxiosInstance;

  protected constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
    });
  }

  public abstract execute(request: TRequest): Promise<TResponse>;

  protected get(params: TRequest) {
    return this.request({
      method: 'GET',
      params,
    });
  }

  protected post(body: TRequest) {
    return this.request({
      method: 'POST',
      data: body,
    });
  }

  protected put(body: TRequest) {
    return this.request({
      method: 'PUT',
      data: body,
    });
  }

  protected delete() {
    return this.request({
      method: 'DELETE',
    });
  }

  private async request(config: RawAxiosRequestConfig): Promise<TResponse> {
    try {
      try {
        const response = await this.http.request(config);

        return response.data as TResponse;
      } catch (err) {
        //@ts-expect-error err as AxiosError
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return err.response.data as TResponse;
      }
    } catch (_) {
      return {
        success: false,
        error: DefaultAPIErrorCode.UnexpectedError,
      } as TResponse;
    }
  }
}
