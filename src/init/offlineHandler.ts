import { Toast } from "@/services/Toast";

window.addEventListener("offline", offlineHandler, false);
window.addEventListener("online", onlineHandler, false);
window.addEventListener("load", loadHandler, true);

function loadHandler() {
  setTimeout(() => {
    navigator.onLine ? () => null : offlineHandler();
  }, 500);
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
