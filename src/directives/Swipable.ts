import { GA } from "./../init/ga";
import { logger } from "./../services/logger/index";
import Vue, { DirectiveOptions, VNode } from "vue";

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
  update(el, binding) {
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
    logger.warn("No Swipable binding options provided!");
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
    if (e.pointerType !== "touch" || isVerticalLike(e.angle)) {
      return;
    }

    el.style.transform = `translateX(${safeSqRoot(e.deltaX)}px)`;
  });

  manager.on("panend", e => {
    if (
      e.pointerType !== "touch" ||
      isVerticalLike(e.angle) ||
      Math.abs(e.deltaX) < 60
    ) {
      el.style.transform = `translateX(0px)`;
      return;
    }

    let toShift = true;
    let isLeftSwipe = e.offsetDirection == Hammer.DIRECTION_LEFT;
    let isRightSwipe = e.offsetDirection == Hammer.DIRECTION_RIGHT;
    if (
      (isLeftSwipe && !binding.hasNext) ||
      (isRightSwipe && !binding.hasPrev)
    ) {
      toShift = false;
    }

    if (toShift) {
      el.style.transition = "";
      el.style.transform = `translateX(${-safeSqRoot(e.deltaX)}px)`;

      isLeftSwipe && el.dispatchEvent(new Event("swipe-left"));
      isRightSwipe && el.dispatchEvent(new Event("swipe-right"));

      GA.sendGeneralEvent(
        "engagement",
        "swipe",
        isLeftSwipe ? "left" : "right"
      );
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

function safeSqRoot(value: number) {
  let sign = Math.sign(value);
  let absValue = Math.abs(value);
  return sign * Math.sqrt(absValue * 100);
}

function isVerticalLike(angle: number) {
  let absAngle = Math.abs(angle);
  if (absAngle >= 90) {
    return absAngle < 150;
  } else {
    return absAngle > 30;
  }
}

Vue.directive("swipable", Swipable);
