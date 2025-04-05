import type { AxiosRequestConfig } from '@/types';
import { buildURL, combineURLs, isAbsoluteURL } from '@/helpers/url';
import { flattenHeaders } from '@/helpers/headers';
import adapters from '@/adapters';
import defaults from '@/defaults';

export default function dispatchRequest(
  config: AxiosRequestConfig
): Promise<any> {
  processConfig(config);
  const adapter = adapters.getAdapter(config?.adapter || defaults.adapter);
  return adapter(config);
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config);
  // config.data = transform()
  config.headers = flattenHeaders(config.headers, config.method!);
}

export function transformURL(config: AxiosRequestConfig): string {
  const { url, params, baseURL } = config;

  const fullPath =
    baseURL && !isAbsoluteURL(url!) ? combineURLs(baseURL, url!) : url;

  return buildURL(fullPath!, params, config.paramsSerializer);
}
