import Vue, { DirectiveOptions, VNodeDirective } from "vue";

const SyncWidth: DirectiveOptions = {
  inserted(el, binding) {
    bind(el, binding);
  }
};

function bind(el: HTMLElement, binding: VNodeDirective) {
  el.style.maxWidth =
    (binding.value * document.getElementById(binding.arg)!.clientWidth) / 100 +
    "px";
}

Vue.directive("sync-width", SyncWidth);
