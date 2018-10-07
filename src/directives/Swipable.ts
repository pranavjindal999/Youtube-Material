import Vue, { DirectiveOptions } from "vue";
import { limitsTo } from "@/extras/utils";

interface CustomElement extends HTMLElement {
  __hammerManager?: HammerManager;
}

export type SwipableOptions = {
  disabled?: boolean;
  hasNext: boolean;
  hasPrev: boolean;
};

const Swipable: DirectiveOptions = {
  inserted(el, binding) {
    bind(el, binding.value);
  },
  update(el, binding, vnode) {
    setTimeout(() => {
      unbind(el);
      bind(el, binding.value);
    });
  },
  unbind(el: CustomElement) {
    unbind(el);
  }
};

function unbind(el: CustomElement) {
  el.__hammerManager && el.__hammerManager.destroy();
}

async function bind(el: CustomElement, binding?: SwipableOptions) {
  if (!binding) {
    console.warn("No Swipable binding options provided!");
    return;
  }

  if (binding.disabled) {
    return;
  }

  let Hammer = await import("hammerjs");
  el.style.transition = "transform .2s";
  let manager = new Hammer.Manager(el);
  el.__hammerManager = manager;
  manager.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL }));
  manager.on("pan", function(e) {
    if (e.pointerType !== "touch" || !e.velocityX) {
      return;
    }

    console.log(e);
    el.style.transform = `translateX(${limitsTo(e.deltaX, 250)}px)`;
  });

  manager.on("panend", e => {
    if (e.pointerType !== "touch") {
      return;
    }
    console.log("panend");

    let toShift = true;
    if (
      (e.offsetDirection == Hammer.DIRECTION_LEFT && !binding.hasNext) ||
      (e.offsetDirection == Hammer.DIRECTION_RIGHT && !binding.hasPrev)
    ) {
      toShift = false;
    }

    if (toShift) {
      el.style.transition = "";
      el.style.transform = `translateX(${-limitsTo(e.deltaX, 250)}px)`;
    }
    requestAnimationFrame(() => {
      el.style.transition = "transform .5s";
      el.style.transform = `translateX(0px)`;
    });

    el.addEventListener("transitionend", resetTransition);
    function resetTransition() {
      el.style.transition = "transform .2s";
      el.removeEventListener("transitionend", resetTransition);
    }
  });
}

Vue.directive("swipable", Swipable);
