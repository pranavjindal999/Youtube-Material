import { IConfig } from "./IConfig";
import { Language } from "@/translations";

let base: IConfig = {
  debugInfo: true,
  defaultLanguage: Language.en,
  local: false,
  production: false,
  staging: false,
  xhrTimeout: 1000 * 10,
  longDateTimeFormat: "Do MMM, YYYY (h:mm A)",
  gaId: "UA-XXXX-LOCAL",
  isPrerendering: navigator.userAgent.toLowerCase().includes("prerender")
};

export default base;
