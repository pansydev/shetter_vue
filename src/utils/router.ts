import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { AuthNavigationGuard } from "@shetter/utils/authNavigationGuard";

import MainPage from "@shetter/pages/MainPage/MainPage.vue";
import LoginPage from "@shetter/pages/LoginPage/LoginPage.vue";
import RegisterPage from "@shetter/pages/RegisterPage/RegisterPage.vue";

const routes: RouteRecordRaw[] = [
  {
    name: "home",
    path: "/",
    component: MainPage,
  },
  {
    path: "/login",
    component: LoginPage,
    beforeEnter: AuthNavigationGuard.unauthorized(),
  },
  {
    path: "/register",
    component: RegisterPage,
    beforeEnter: AuthNavigationGuard.unauthorized(),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
