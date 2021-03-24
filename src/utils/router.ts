import { createRouter, createWebHashHistory } from "vue-router";

import MainPage from "@shetter/pages/MainPage/MainPage.vue";
import LoginPage from "@shetter/pages/LoginPage/LoginPage.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
