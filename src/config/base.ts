import { IConfig } from "./IConfig";
import { Language } from "@/translations";

let base: IConfig = {
  debugInfo: true,
  defaultLanguage: Language.en,
  local: false,
  production: false,
  xhrTimeout: 1000 * 10
};

export default base;
