import { Toast } from "@/services/Toast";
import { sleep } from "@/extras/sleep";

window.addEventListener("offline", offlineHandler, false);
window.addEventListener("online", onlineHandler, false);
window.addEventListener("load", loadHandler, true);

async function loadHandler() {
  await sleep(500);
  navigator.onLine ? () => null : offlineHandler();
}

function onlineHandler() {
  Toast.show({
    message: "onlineMessage",
    intent: "success",
    noShake: true
  });
  document.getElementById("main-content")!.style.filter = "";
}

function offlineHandler() {
  Toast.show({
    message: "offlineMessage",
    intent: "error",
    noCloseButton: true,
    timeout: Infinity
  });
  document.getElementById("main-content")!.style.filter = "grayscale(1)";
}
