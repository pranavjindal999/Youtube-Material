import moment from "moment";

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

export function humanizeDuration(durationIsoOrMs: string | number) {
  let duration = moment.duration(durationIsoOrMs).format("h:m:ss");
  if (duration.includes(":")) {
    return duration;
  } else {
    duration = duration.length === 1 ? "0" + duration : duration;
    return `0:${duration}`;
  }
}
