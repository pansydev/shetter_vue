import { createRouter, createWebHashHistory } from "vue-router";

import MainPage from "@shetter/views/MainPage.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
