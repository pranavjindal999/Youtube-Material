import loadJs from "load-js";
import { Deferred } from "@/extras/Deferred";
import { Toast } from "@/services/Toast";
import config from "@/config";
import { TopProgress } from "@/services/topProgress";

let deferred = new Deferred<boolean>();

(window as any).onYouTubeIframeAPIReady = function() {
  deferred.resolve();
};

loadJs(["https://www.youtube.com/iframe_api"]).catch(() => {
  deferred.reject();
});

setTimeout(() => {
  deferred.reject();
}, config.xhrTimeout);

deferred.promise.catch(() => {
  Toast.show({
    message: "YoutubeIFrameAPILoadError",
    intent: "error"
  });
});

TopProgress.startAuto(deferred.promise);

export const asyncYoutubeIframeAPI = deferred.promise;
