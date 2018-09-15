import { Language } from "@/translations";

export interface IConfig {
  local?: boolean;
  production?: boolean;
  environment?: "production" | "local";
  xhrTimeout: number;
  defaultLanguage: Language;
  debugInfo: boolean;
}
