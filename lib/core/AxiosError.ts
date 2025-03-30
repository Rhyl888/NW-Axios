import {
  AxiosErrorCode,
  AxiosError as IAxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from '@/types';
import { isFunction } from '@/helpers/is';
import { toJSONObject } from '@/helpers';

export default class AxiosError extends Error implements IAxiosError {
  isAxiosError: boolean;

  constructor(
    message: string,
    public code: AxiosErrorCode | null = null,
    public config: AxiosRequestConfig,
    public request?: XMLHttpRequest,
    public response?: AxiosResponse
  ) {
    super(message);
    this.isAxiosError = true;
    Object.setPrototypeOf(this, AxiosError.prototype);

    // Node 环境下，Error.captureStackTrace
    // if (isFunction(Error.captureStackTrace)) {
    //   Error.captureStackTrace(this, AxiosError);
    // }

    this.stack = new Error().stack;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      stack: this.stack,
      code: this.code,
      status: (this.response && this.response.status) ?? null,
      config: toJSONObject(this.config)
    };
  }
}

const descriptors: Record<string, { value: AxiosErrorCode }> = {};
[
  'ERR_BAD_OPTION',
  'ERR_BAD_OPTION_VALUE',
  'ECONNABORTED',
  'ERR_BAD_REQUEST',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_NETWORK',
  'ERR_CANCELED',
  'ERR_INVALID_URL',
  'ERR_TIMEOUT',
  'ERR_BAD_RESPONSE',
  'ERR_NOT_SUPPORT',
  'ERR_MISSED_CALLBACK',
  'ERR_BAD_METHOD'
].forEach((code) => {
  descriptors[code as AxiosErrorCode] = { value: code as AxiosErrorCode };
});

Object.defineProperties(AxiosError, descriptors);

function createError(
  message: string,
  config: AxiosRequestConfig,
  code: AxiosErrorCode | null,
  request?: XMLHttpRequest,
  response?: AxiosResponse
): AxiosError {
  return new AxiosError(message, code, config, request, response);
}

export { createError, descriptors as ErrorCodes };
