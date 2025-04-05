export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export type Params = Record<string, any>;
export type IHeaders = Record<string, any>;

export interface AxiosRequestConfig {
  method?: Method;
  url?: string;
  data?: any;
  params?: any;
  headers?: IHeaders | null;
  baseURL?: string;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
  adapter?:
    | 'http'
    | 'xhr'
    | 'fetch'
    | ((config: AxiosRequestConfig) => AxiosPromise);
  validateStatus?: (status: number) => boolean;
  paramsSerializer?: (params: Params) => string;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: IHeaders;
  config: AxiosRequestConfig;
  request: XMLHttpRequest;
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export type AxiosErrorCode =
  | 'ERR_BAD_OPTION'
  | 'ERR_BAD_OPTION_VALUE'
  | 'ECONNABORTED'
  | 'ERR_BAD_REQUEST'
  | 'ERR_NETWORK'
  | 'ERR_CANCELED'
  | 'ERR_INVALID_URL'
  | 'ERR_TIMEOUT'
  | 'ERR_BAD_RESPONSE'
  | 'ERR_NOT_SUPPORT'
  | 'ERR_MISSED_CALLBACK'
  | 'ERR_BAD_METHOD';

export interface AxiosError extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: AxiosErrorCode | null;
  request?: XMLHttpRequest;
  response?: AxiosResponse;
}

export interface Axios {
  defaults: AxiosRequestConfig;
  request: <T = any>(config: AxiosRequestConfig) => AxiosPromise<T>;
}

export interface AxiosInstance extends Axios {}
