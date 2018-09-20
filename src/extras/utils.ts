type ObjectOf<T> = { [key: string]: T };

export function toQueryString(paramsObject: ObjectOf<string>) {
  return Object.keys(paramsObject)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`
    )
    .join("&");
}

export function randomString(length: number = 32) {
  var out = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < length; i++) {
    out += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return out;
}
