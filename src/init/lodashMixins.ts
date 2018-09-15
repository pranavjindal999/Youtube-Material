import _ from "lodash";
declare module "lodash" {
  interface LoDashStatic {
    /**
     *Returns a query string for any object.
     *
     * @param {ObjectOf<string>} paramsObject Object representing query string
     * @returns {string} Query string
     * @memberof LoDashStatic
     */
    toQueryString(paramsObject: ObjectOf<string>): string;
    /**
     * Creates a aplhabatical random string of specified length.
     *
     * @param {number} [length] Length of string to be generated. Default = 32.
     * @returns {string} Random string generated.
     * @memberof LoDashStatic
     */
    randomString(length?: number): string;
    /**
     * Returns object[key] if exists on object, else returns defaultValue.
     *
     * @template T Type of values in object, specifically type of object[key].
     * @template K Type of default value to return
     * @param {ObjectOf<T>} object Object to to look key on.
     * @param {string} key Property key to look for on object.
     * @param {K} defaultValue value to return if not found on object.
     * @returns {(T | K)} Return value as described.
     * @memberof LoDashStatic
     */
    propOrDefault<T, K>(
      object: ObjectOf<T>,
      key: string,
      defaultValue: K
    ): T | K;
  }
  interface LoDashExplicitWrapper<TValue> {
    /**
     * Returns object[key] if exists on object, else returns defaultValue.
     *
     * @param {string} key Property key to look for on object.
     * @param {*} defaultValue value to return if not found on object.
     * @returns {LoDashExplicitWrapper<any>} Return value as described.
     * @memberof LoDashExplicitWrapper
     */
    propOrDefault(key: string, defaultValue: any): LoDashExplicitWrapper<any>;
  }
  interface LoDashImplicitWrapper<TValue> {
    /**
     * Returns object[key] if exists on object, else returns defaultValue.
     *
     * @param {string} key Property key to look for on object.
     * @param {*} defaultValue value to return if not found on object.
     * @returns {LoDashImplicitWrapper<any>} Return value as described.
     * @memberof LoDashImplicitWrapper
     */
    propOrDefault(key: string, defaultValue: any): LoDashImplicitWrapper<any>;
  }
}

_.mixin({
  randomString,
  propOrDefault,
  toQueryString
});

function randomString(length: number = 32) {
  var out = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < length; i++) {
    out += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return out;
}

function propOrDefault<T, K>(
  object: ObjectOf<T>,
  key: string,
  defaultValue: K
) {
  if (object.hasOwnProperty(key)) return object[key];
  else return defaultValue;
}

function toQueryString(paramsObject: ObjectOf<string>) {
  return Object.keys(paramsObject)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`
    )
    .join("&");
}

type ObjectOf<T> = { [key: string]: T };
