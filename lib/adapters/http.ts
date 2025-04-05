import { kindOf } from '@/helpers';
import { AxiosPromise, AxiosRequestConfig } from '@/types';

const isHttpAdapterSupported =
  typeof process !== 'undefined' && kindOf(process) === 'process';
export default isHttpAdapterSupported &&
  function httpAdapter(_config: AxiosRequestConfig): AxiosPromise {
    return new Promise((_resolve, _reject) => {});
  };
