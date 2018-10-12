import en from "@/translations/en";
import { reduce } from "lodash";

export enum Language {
  en = "en"
}

type NestedLangKeys<T extends {}> = {
  [key in keyof T]: T[key] extends {} ? NestedLangKeys<T[key]> : string
};

type NestedLangObject = {
  [key: string]: NestedLangObject | string;
};

function constructLangKeysObject(obj: NestedLangObject, parentKey = "") {
  return reduce(
    obj,
    (acc, item, key) => {
      if (typeof item === "string") {
        acc[key] = parentKey + key;
      } else {
        acc[key] = constructLangKeysObject(item, key + ".");
      }
      return acc;
    },
    {} as NestedLangKeys<typeof obj>
  );
}

export const LangKeys = constructLangKeysObject(en) as NestedLangKeys<
  typeof en
>;
