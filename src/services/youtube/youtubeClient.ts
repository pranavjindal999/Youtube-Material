import { GA } from "./../../init/ga";
import { TopProgress } from "./../topProgress/index";
import { Toast } from "@/services/Toast";

window.gapiClientPromise.catch(() => {
  GA.sendException("YoutubeClientAPILoadError", true);
  Toast.show({
    message: "YoutubeClientAPILoadError",
    intent: "error"
  });
});

TopProgress.startAuto(window.gapiClientPromise);

export const asyncYoutubeClientAPI = window.gapiClientPromise;
