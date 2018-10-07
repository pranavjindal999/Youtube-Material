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

export function humanizeNumber(number: number): string {
  switch (true) {
    case number > 999999999:
      return (number / 1000000000).toFixed(1).toString() + "B";
    case number > 999999:
      return (number / 1000000).toFixed(1).toString() + "M";
    case number > 999:
      return (number / 1000).toFixed(1).toString() + "K";
    default:
      return number.toString();
  }
}

export function limitsTo(value: number, limit: number) {
  let sign = Math.sign(value);
  let absValue = Math.abs(value);
  if (absValue >= limit) {
    return sign * limit;
  } else {
    return sign * absValue * (Math.log(absValue) / Math.log(limit));
  }
}
