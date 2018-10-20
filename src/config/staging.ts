import { IConfig } from "./IConfig";

let staging: Partial<IConfig> = {
  debugInfo: false,
  xhrTimeout: 1000 * 60,
  gaId: "UA-81891151-4"
};

export default staging;
