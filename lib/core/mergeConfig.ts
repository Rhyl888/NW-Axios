import { deepMerge } from '@/helpers';
import { isNil, isPlainObject } from '@/helpers/is';
import { AxiosRequestConfig } from '@/types';

interface StartFn {
  (val1: unknown, val2: unknown): any;
}

const defaultStrat: StartFn = (val1, val2) => {
  return val2 ?? val1;
};

const fromVal2Strat: StartFn = (_val1, val2) => {
  if (typeof val2 != null) {
    return val2;
  }
};

const deepMergeStrat: StartFn = (val1, val2) => {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  }
  if (!isNil(val2)) {
    return val2;
  }
  if (isPlainObject(val1)) {
    return deepMerge(val1);
  }
  if (!isNil(val1)) {
    return val1;
  }
};

const stratMap = new Map<string, StartFn>([
  ['url', fromVal2Strat],
  ['params', fromVal2Strat],
  ['data', fromVal2Strat],
  ['headers', deepMergeStrat],
  ['auth', deepMergeStrat]
]);

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {};
  }

  const result = Object.create(null);

  const mergeField = (key: string): void => {
    const strat = stratMap.get(key) ?? defaultStrat;
    result[key] = strat(config1[key], config2![key]);
  };

  for (const key in config2) {
    mergeField(key);
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }
  return result;
}
