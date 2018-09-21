import en from "@/translations/en";
import { reduce } from "lodash";

export enum Language {
  en = "en"
}

export const LangKeys = reduce(
  en,
  (acc: any, item, key) => {
    acc[key] = key;
    return acc;
  },
  {}
) as { [key in keyof typeof en]: string };
