import type { AxiosRequestConfig, AxiosInstance } from './types';
import Axios from './core/Axios';
import defaults from './defaults';

function createInstance(config: AxiosRequestConfig) {
  const context = new Axios(config);

  return context as AxiosInstance;
}

const axios = createInstance(defaults);

export default axios;
