import { IConfig } from "./IConfig";
import { Language } from "@/translations";

let base: IConfig = {
  apiKey: "AIzaSyC3Xr5IjKLB2mON_9KJA7PZbEVb6FMH-WQ",
  debugInfo: true,
  defaultLanguage: Language.en,
  local: false,
  production: false,
  staging: false,
  xhrTimeout: 1000 * 10
};

export default base;
