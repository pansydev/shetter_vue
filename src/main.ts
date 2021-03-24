import { createApp } from "vue";
import { router } from "@shetter/utils/router";
import { observeVisibility } from "@shetter/utils/observe-visibility";
import App from "@shetter/App.vue";

import "../assets/main.css";

createApp(App)
  .use(router)
  .directive("observe-visibility", {
    beforeMount: (el, binding, node) => {
      (node as any).context = binding.instance;
      observeVisibility.bind(el, binding, node);
    },
    updated: observeVisibility.update,
    unmounted: observeVisibility.unbind,
  })
  .mount("#app");
