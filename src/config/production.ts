import { IConfig } from "./IConfig";

let production: Partial<IConfig> = {
  debugInfo: false,
  xhrTimeout: 1000 * 60,
  gaId: "UA-81891151-3"
};

export default production;
