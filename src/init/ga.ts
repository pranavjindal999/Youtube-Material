import config from "@/config";
import { gtagPlugin } from "@/extras/gtagPlugin";
import Vue from "vue";

Vue.use(gtagPlugin, {
  id: config.gaId,
  debugInfo: config.debugInfo,
  sendHit: !config.local
});
