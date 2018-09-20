import { IConfig } from "./IConfig";

let staging: Partial<IConfig> = {
  debugInfo: false,
  xhrTimeout: 1000 * 30
};

export default staging;
