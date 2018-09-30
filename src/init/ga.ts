import loadJs from "load-js";
import config from "@/config";
import { Vue } from "vue-property-decorator";

window.dataLayer = [];
window.gtag = function() {
  window.dataLayer!.push(arguments);
};
window.gtag("js", new Date());
window.gtag("config", "UA-81891151-1");

Vue.prototype.$gaEvent = (event: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  window.gtag("event", event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value
  });
};

if (config.gaId) {
  loadJs([`https://www.googletagmanager.com/gtag/js?id=${config.gaId}`]);
}
