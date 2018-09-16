import loadJs from "load-js";
import { Deferred } from "@/extras/Deferred";
import { Toast } from "@/services/Toast";

let deferred = new Deferred<boolean>();

(window as any).onYouTubeIframeAPIReady = function() {
  deferred.resolve();
};

loadJs(["https://www.youtube.com/iframe_api"]).catch(() => {
  deferred.reject();
});

setTimeout(() => {
  deferred.reject();
}, 10000);

deferred.promise.catch(() => {
  Toast.show({
    message: "YoutubeIFrameAPILoadError",
    intent: "error"
  });
});

export const asyncYoutubeIframeAPI = deferred.promise;
