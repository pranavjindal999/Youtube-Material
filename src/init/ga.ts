import config from "@/config";
import { Vue } from "vue-property-decorator";
import VueAnalytics from "vue-analytics";
import { $router } from "@/router";

Vue.use(VueAnalytics, {
  id: config.gaId,
  router: $router,
  autoTracking: {
    screenview: true,
    exception: true
  },
  debug: {
    enabled: config.local,
    trace: config.local,
    sendHitTask: !config.local
  }
});
