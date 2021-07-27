import {
    iosTransitionAnimation,
    Animation,
    mdTransitionAnimation
  } from "@ionic/core";
  
  export const TRANSITION_HORIZONTAL = "attr.data-transition-horizontal";
  export const ROUTER_TRANSITION_HORIZONTAL = "data-transition-horizontal";

  export function customTransition(navEl, opts): Animation {
    console.log(navEl, opts)
    const enteringDirection = opts.enteringEl.getAttribute(
      "data-transition-horizontal"
    );
    const leavingDirection = opts.leavingEl.getAttribute(
      "data-transition-horizontal"
    );
    const routerOutletDirection = navEl.getAttribute(
      "data-transition-horizontal"
    );
    if (
      enteringDirection !== null ||
      leavingDirection !== null ||
      routerOutletDirection !== null
    ) {
      return iosTransitionAnimation(navEl, opts);
    }
    return mdTransitionAnimation(navEl, opts);
  }
  