import { Toast } from "@/services/Toast";
import loadJs from "load-js";
import config from "@/config";
import { Deferred } from "@/extras/Deferred";

let deferred = new Deferred<boolean>();

loadJs(["https://apis.google.com/js/api.js"])
  .then(() => {
    gapi.load("client", () => {
      gapi.client
        .init({
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
          ],
          apiKey: config.apiKey
        })
        .then(() => {
          deferred.resolve();
        })
        .catch(() => {
          deferred.reject();
        });
    });
  })
  .catch(() => {
    deferred.reject();
  });

deferred.promise.catch(() => {
  Toast.show({
    message: "YoutubeClientAPILoadError",
    intent: "error"
  });
});

setTimeout(() => {
  deferred.reject();
}, config.xhrTimeout);

export const asyncYoutubeClientAPI =
  /* new Promise(() => {}); */ deferred.promise;
