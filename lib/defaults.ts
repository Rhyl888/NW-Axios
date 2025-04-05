import { AxiosRequestConfig } from './types';

export default {
  timeout: 0,
  adapter: 'xhr',
  method: 'GET',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  validityStatus(status: number) {
    return status >= 200 && status < 300;
  }
} as AxiosRequestConfig;
