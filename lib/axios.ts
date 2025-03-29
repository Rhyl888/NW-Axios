import type { AxiosRequestConfig, AxiosInstance } from './types';
import Axios from './core/Axios';

function createInstance(config: AxiosRequestConfig) {
  const context = new Axios(config);

  return context as AxiosInstance;
}

const axios = createInstance({
  method: 'GET',
  headers: {
    common: {
      Accept: 'application/json'
    }
  },
  validateStatus(status) {
    return status >= 200 && status < 300;
  }
});

export default axios;
