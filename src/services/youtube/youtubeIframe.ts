import { GA } from "./../../init/ga";
import loadJs from "load-js";
import { Deferred } from "@/extras/Deferred";
import { Toast } from "@/services/Toast";
import config from "@/config";
import { TopProgress } from "@/services/topProgress";

let deferred = new Deferred<boolean>();

window.onYouTubeIframeAPIReady = function() {
  deferred.resolve();
};

loadJs(["https://www.youtube.com/iframe_api"]).catch(() => {
  deferred.reject();
});

setTimeout(() => {
  deferred.reject();
}, config.xhrTimeout);

deferred.promise.catch(() => {
  GA.sendException("YoutubeIFrameAPILoadError", true);
  Toast.show({
    message: "YoutubeIFrameAPILoadError",
    intent: "error"
  });
});

TopProgress.startAuto(deferred.promise);

export const asyncYoutubeIframeAPI = deferred.promise;
