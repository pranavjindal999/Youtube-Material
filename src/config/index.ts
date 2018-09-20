import { IConfig } from "./IConfig";
import base from "./base";
import production from "./production";
import { merge } from "lodash";
import staging from "@/config/staging";

let config: IConfig = base;

switch (process.env.VUE_APP_MODE) {
  case "production":
    config = merge(base, production);
    config.environment = "production";
    config.production = true;
    break;
  case "staging":
    config = merge(base, staging);
    config.environment = "staging";
    config.staging = true;
    break;
  case "local":
    config.environment = "local";
    config.local = true;
}

export default config as Required<Readonly<IConfig>>;
