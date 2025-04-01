import { IHeaders, Method } from '@/types';
import { deepMerge } from '.';

export function flattenHeaders(
  headers: IHeaders | undefined | null,
  method: Method
): IHeaders | undefined | null {
  if (!headers) {
    return headers;
  }
  headers = deepMerge(headers.common, headers[method], headers);
  const methodsToDelete = ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'];
  if (headers) {
    methodsToDelete.forEach((method) => {
      delete headers[method];
    });
  }
  return headers;
}
