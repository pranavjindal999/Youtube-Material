import { Language } from "@/translations";

export interface IConfig {
  local?: boolean;
  production?: boolean;
  staging?: boolean;
  environment?: "production" | "local" | "staging";
  xhrTimeout: number;
  defaultLanguage: Language;
  debugInfo: boolean;
  longDateTimeFormat: string;
  gaId: string;
}
