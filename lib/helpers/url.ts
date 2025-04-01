import { Params } from '@/types';
import { isDate, isPlainObject, isURLSearchParams } from './is';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

export function combineURLs(baseURL: string, relativeURL: string): string {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

export function buildURL(
  url: string,
  params: Params,
  paramsSerializer?: (params: Params) => string
): string {
  if (!params) return url;

  let serializedParams: string;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    const parts: string[] = [];
    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val === null || typeof val === 'undefined') return;
      const values = Array.isArray(val) ? val : [val];
      values.forEach((v) => {
        if (isDate(v)) v = v.toISOString();
        else if (isPlainObject(v)) v = JSON.stringify(v);
        parts.push(`${encode(key)}=${encode(v)}`);
      });
    });
    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}
