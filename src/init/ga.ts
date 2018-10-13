import config from "@/config";
import loadJS from "load-js";
import { $router } from "@/router";
import { sleep } from "@/extras/sleep";
import { logger } from "@/services/logger";

class GtagPlugin {
  private options: GtagOptions;

  constructor(options: GtagOptions) {
    this.options = options;
    this.appendGtagScript();
    this.setWindowVars();
    this.attachToRouter();
  }

  private setWindowVars() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", this.options.id);
  }

  private appendGtagScript() {
    if (this.options.sendHit)
      loadJS([
        `https://www.googletagmanager.com/gtag/js?id=${this.options.id}`
      ]);
  }

  private attachToRouter() {
    $router.afterEach(async to => {
      await sleep(300);
      this.sendEvent("config", this.options.id, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: to.fullPath
      });
    });
  }

  private sendEvent(...args: any[]) {
    this.options.debugInfo && logger.log(args);
    window.gtag(...args);
  }

  sendException(description: string, fatal: boolean = false) {
    this.sendEvent("event", "exception", {
      description: description,
      fatal: fatal
    });
  }

  sendGeneralEvent(
    category: EventCategories,
    action: string,
    label?: string,
    value?: number
  ) {
    this.sendEvent("event", action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
}

export const GA = new GtagPlugin({
  id: config.gaId,
  debugInfo: config.debugInfo,
  sendHit: !config.local
});

type GtagOptions = {
  id: string;
  debugInfo: boolean;
  sendHit: boolean;
};

type EventCategories = "engagement";
