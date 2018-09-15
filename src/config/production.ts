import { IConfig } from "./IConfig";

let production: Partial<IConfig> = {
  debugInfo: false,
  xhrTimeout: 1000 * 30
};

export default production;
