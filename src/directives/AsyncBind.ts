import Vue, { DirectiveOptions } from "vue";

const AsyncBind: DirectiveOptions = {
  bind(el, binding, vnode) {
    bind(el, binding.value);
  },
  update(el, binding, vnode) {
    bind(el, binding.value);
  }
};

function bind(el: HTMLElement, binding: Promise<string>) {
  if (binding) {
    el.innerHTML = "...";
    binding.then(value => {
      el.innerHTML = value;
    });
  }
}

Vue.directive("async-bind", AsyncBind);
