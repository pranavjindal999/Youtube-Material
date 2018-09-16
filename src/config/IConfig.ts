import { Language } from "@/translations";

export interface IConfig {
  apiKey: string;
  local?: boolean;
  production?: boolean;
  environment?: "production" | "local";
  xhrTimeout: number;
  defaultLanguage: Language;
  debugInfo: boolean;
}
