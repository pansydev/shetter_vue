import { createApp } from "vue";

import { router } from "@shetter/utils/router";
import { observeVisibility } from "@shetter/utils/observe-visibility";
import { tokenManager } from "@shetter/utils/tokenManager";
import { i18n } from "@shetter/utils/i18n";

import App from "@shetter/App.vue";

import "../assets/main.css";

tokenManager.load();

createApp(App).use(router).use(observeVisibility).use(i18n).mount("#app");
