import { isArray, isObject, isPlainObject, isUndefined } from './is';

export function toJSONObject<T = object>(obj: T) {
  const stack = Array.from({ length: 10 });

  const visit = (source: T, i: number) => {
    if (isObject(source)) {
      if (stack.includes(source)) {
        return;
      }
      if (!('toJSON' in source)) {
        stack[i] = source;
        const traget: Record<string | number, any> = isArray(source) ? [] : {};
        for (const key in source) {
          const value = (source as Record<string, any>)[key];
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (traget[key] = reducedValue);
        }
        stack[i] = void 0;
        return traget;
      }
    }
    return source;
  };
  return visit(obj, 0);
}

export const kindOf = ((cache) => (thing: unknown) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const { getPrototypeOf } = Object;

export { getPrototypeOf };

export function deepMerge(...args: any[]) {
  const result = Object.create(null);

  const assignValue = (val: unknown, key: string) => {
    if (isPlainObject(result[key] && isPlainObject(val))) {
      result[key] = deepMerge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  };

  for (let i = 0; i < args.length; i++) {
    const obj = args[i];

    for (let key in obj) {
      assignValue(obj[key], key);
    }
  }
  return result;
}
