import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import formatDuration from "format-duration";
import { parse, toSeconds } from "iso8601-duration";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export function formatDate(date: Date | string | number, format: string) {
  return dayjs(date).format(format);
}

export function humanizeDuration(durationIsoOrMs: string | number) {
  let duration: number;

  if (typeof durationIsoOrMs === "string") {
    duration = toSeconds(parse(durationIsoOrMs)) * 1000;
  } else {
    duration = +durationIsoOrMs;
  }

  return formatDuration(duration);
}

export function fromNow(date: string | Date) {
  return (dayjs(date) as any).fromNow();
}

export function ms(
  amount: number,
  unit: "sec" | "min" | "hour" | "day" | "month" | "year"
) {
  switch (unit) {
    case "sec":
      return amount * 1000;
    case "min":
      return amount * 60 * 1000;
    case "hour":
      return amount * 60 * 60 * 1000;
    case "day":
      return amount * 60 * 60 * 24 * 1000;
    case "month":
      return amount * 60 * 60 * 24 * 30 * 1000;
    case "year":
      return amount * 60 * 60 * 24 * 365 * 1000;
  }
}
