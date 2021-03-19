import { createApp } from "vue";
import { router } from "@shetter/utils/router";
import App from "@shetter/App.vue";

import "../assets/main.css";

createApp(App).use(router).mount("#app");
