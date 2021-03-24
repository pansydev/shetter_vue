import { createRouter, createWebHashHistory } from "vue-router";

import MainPage from "@shetter/pages/MainPage/MainPage.vue";

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
