import Vue from "vue";
import config from "@/config";

if (sessionStorage.getItem("debug")) {
  (config.debugInfo as any) = true;
}

Vue.config.productionTip = config.debugInfo;
Vue.config.devtools = config.debugInfo;

if (config.debugInfo) {
  Vue.config.errorHandler = function(err, vm, info) {
    showError(`You have an error in console. Please fix it. <br>
    -----ERROR------<br>
    ${err.toString()}<br>
    -----STACK TRACE-----<br>
    ${err.stack}<br>
    `);
  };

  Vue.config.warnHandler = function(msg, vm, trace) {
    showError(`You have Vue warning in console. Please fix it.<br>
    -----WARNING------<br>
    ${msg}<br>
    -----COMPONENT TRACE-----<br>
    ${trace}<br>
    `);
  };
}

(window as any).enableDebugInfo = function() {
  sessionStorage.setItem("debug", "true");
  window.location.reload();
};

(window as any).disableDebugInfo = function() {
  sessionStorage.removeItem("debug");
  window.location.reload();
};

/**
 * function to show error overlay.
 *
 * @param {string} errorMessage
 * @param {boolean} [isWarning]
 * @returns {void}
 */
function showError(errorMessage: string, isWarning?: boolean): void {
  if (document.getElementById("__w-error-div")) {
    let errorDiv = document.getElementById("__w-error-div") as HTMLDivElement;

    return appendErrorP(errorMessage, errorDiv, isWarning);
  }

  let errorDiv = document.createElement("div");
  errorDiv.id = "__w-error-div";
  errorDiv.style.position = "fixed";
  errorDiv.style.right = "0";
  errorDiv.style.top = "0";
  errorDiv.style.height = "100%";
  errorDiv.style.background = "grey";
  errorDiv.style.width = "400px";
  errorDiv.style.zIndex = "99999999";
  errorDiv.style.overflow = "scroll";

  let close = document.createElement("button");
  close.innerHTML = "Close";
  close.style.height = "30px";
  close.style.width = "100%";
  close.style.background = "red";

  close.onclick = function(): void {
    errorDiv.remove();
  };

  errorDiv.appendChild(close);

  appendErrorP(errorMessage, errorDiv, isWarning);

  document.body.appendChild(errorDiv);
}

/**
 * Internal function used by showError
 *
 * @param {string} errorMessage
 * @param {HTMLDivElement} divToAppend
 * @param {boolean} [isWarning]
 */
function appendErrorP(
  errorMessage: string,
  divToAppend: HTMLDivElement,
  isWarning?: boolean
): void {
  let errorP = document.createElement("p");
  errorP.style.background = "#f18b8b";
  if (isWarning) {
    errorP.style.background = "#dccb79";
  }
  errorP.innerHTML = errorMessage;
  divToAppend.appendChild(errorP);
}
