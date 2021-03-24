import { App } from "vue";
import { ObserveVisibility } from "vue-observe-visibility";

export function observeVisibility(app: App) {
  app.directive("observe-visibility", {
    beforeMount: (el, binding, node) => {
      (node as any).context = binding.instance;
      ObserveVisibility.bind(el, binding, node);
    },
    updated: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
  });
}
