import { sleep } from "@/extras/sleep";
import { logger } from "./../../services/logger/index";
import { PluginObject } from "vue";
import loadJS from "load-js";
import { $router } from "@/router";

export const gtagPlugin: PluginObject<GtagOptions> = {
  install(Vue, options) {
    if (!options) {
      throw "Gtag plugin options required";
    }

    new GtagPlugin(options);
  }
};

class GtagPlugin {
  options: GtagOptions;

  constructor(options: GtagOptions) {
    this.options = options;
    this.appendGtagScript();
    this.setWindowVars();
    this.attachToRouter();
  }

  setWindowVars() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", this.options.id);
  }

  appendGtagScript() {
    if (this.options.sendHit)
      loadJS([
        `https://www.googletagmanager.com/gtag/js?id=${this.options.id}`
      ]);
  }

  attachToRouter() {
    $router.afterEach(async to => {
      await sleep(300);
      this.sendEvent("config", this.options.id, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: to.fullPath
      });
    });
  }

  sendEvent(...args: any[]) {
    this.options.debugInfo && logger.log(args);
    window.gtag(...args);
  }
}

type GtagOptions = {
  id: string;
  debugInfo: boolean;
  sendHit: boolean;
};
