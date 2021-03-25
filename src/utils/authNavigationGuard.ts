import { NavigationGuardWithThis } from "vue-router"

export enum AccessLevel {
  Authorized,
  Unauthorized,
  All,
}

export const AuthNavigationGuard = {
  authorized: () => authNavigationGuard(AccessLevel.Authorized),
  unauthorized: () => authNavigationGuard(AccessLevel.Unauthorized),
  all: () => authNavigationGuard(AccessLevel.All),
}

export function authNavigationGuard(accessLevel: AccessLevel): NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[] | undefined {
  return (to, from, next) => {
    const accessToken = window.localStorage.getItem("accessToken");
    const currentAccessLevel = accessToken ? AccessLevel.Authorized : AccessLevel.Unauthorized;

    if (accessLevel === AccessLevel.All)
      return next();

    return next(accessLevel === currentAccessLevel);
  };
}