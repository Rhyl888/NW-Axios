import { isFunction } from '@/helpers/is';
import { AxiosPromise, AxiosRequestConfig } from '@/types';

const isFetchAdapterSupported =
  typeof XMLHttpRequest !== 'undefined' && isFunction(fetch);
export default isFetchAdapterSupported &&
  function fetchAdapter(_config: AxiosRequestConfig): AxiosPromise {
    return new Promise((_resolve, _reject) => {});
  };
