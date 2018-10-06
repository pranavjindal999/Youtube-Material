import Vue, { DirectiveOptions } from "vue";

interface CustomElement extends HTMLElement {
  __hammerManager?: HammerManager;
}

const Swipable: DirectiveOptions = {
  inserted(el, binding) {
    bind(el, binding.value);
  },
  unbind(el: CustomElement) {
    el.__hammerManager && el.__hammerManager.destroy();
  }
};

async function bind(
  el: CustomElement,
  binding?: { hasNext: boolean; hasPrev: boolean }
) {
  let Hammer = await import("hammerjs");

  el.style.transition = "transform .2s";
  let manager = new Hammer.Manager(el);
  el.__hammerManager = manager;
  manager.add(new Hammer.Pan());
  manager.on("pan", function(e) {
    el.style.transform = `translateX(${e.deltaX}px)`;
  });

  manager.on("panend", e => {
    let isNextSwipe = e.deltaX < 0;
    let isPrevSwipe = e.deltaX > 0;
    let toAnimate = true;
    if (isNextSwipe && !el.className.includes("is-swipable-next")) {
      toAnimate = false;
    }
    if (isPrevSwipe && !el.className.includes("is-swipable-prev")) {
      toAnimate = false;
    }

    if (toAnimate) {
      el.style.transition = "";
      el.style.transform = `translateX(${-e.deltaX}px)`;
    }
    requestAnimationFrame(() => {
      el.style.transition = "transform .5s";
      el.style.transform = `translateX(0px)`;
    });

    function resetTransition() {
      el.style.transition = "transform .2s";
      el.removeEventListener("transitionend", resetTransition);
    }

    el.addEventListener("transitionend", resetTransition);
  });
}

Vue.directive("swipable", Swipable);
