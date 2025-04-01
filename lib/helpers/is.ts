import { getPrototypeOf, kindOf } from './index';

const objToString = Object.prototype.toString;

const typeOfTest = (type: string) => (thing: unknown) => typeof thing === type;

export const isFunction = typeOfTest('function') as (thing: unknown) => thing is Function;

export const isString = typeOfTest('string') as (thing: unknown) => thing is string;

export const isNumber = typeOfTest('number') as (thing: unknown) => thing is number;

export const isUndefined = typeOfTest('undefined') as (thing: unknown) => thing is undefined;

export const isObject = (thing: unknown): thing is Object =>
  thing !== null && typeof thing === 'object';

export const isArray = <T = any>(thing: unknown): thing is T[] => Array.isArray(thing);
export const isNil = (thing: unknown): boolean => thing == null;

export const isDate = (thing: unknown): thing is Date =>
  objToString.call(thing) === '[object Date]';

export function isPlainObject(thing: unknown): boolean {
  if (kindOf(thing) !== 'object') {
    return false;
  }
  const prototype = getPrototypeOf(thing);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in (thing as Object)) &&
    !(Symbol.iterator in (thing as Object))
  );
}

export function isURLSearchParams(thing: unknown): thing is URLSearchParams {
  return typeof URLSearchParams !== 'undefined' && thing instanceof URLSearchParams;
}
