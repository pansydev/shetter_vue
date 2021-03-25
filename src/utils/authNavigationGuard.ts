import { NavigationGuardWithThis } from "vue-router";

export enum AccessLevel {
  Authorized,
  Unauthorized,
}

export const AuthNavigationGuard = {
  authorized: () => authNavigationGuard(AccessLevel.Authorized),
  unauthorized: () => authNavigationGuard(AccessLevel.Unauthorized),
};

export function authNavigationGuard(
  accessLevel: AccessLevel
): NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[] | undefined {
  return (to, from, next) => {
    const accessToken = window.localStorage.getItem("accessToken");
    const currentAccessLevel = accessToken ? AccessLevel.Authorized : AccessLevel.Unauthorized;

    return next(accessLevel === currentAccessLevel);
  };
}
