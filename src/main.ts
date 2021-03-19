import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@shetter/utils/router";

createApp(App).use(router).mount("#app");
