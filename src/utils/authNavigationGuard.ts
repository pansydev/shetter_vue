import { NavigationGuardWithThis } from "vue-router";
import { tokenManager } from "@shetter/utils/tokenManager";

export enum AccessLevel {
  Authorized,
  Unauthorized,
}

export const AuthNavigationGuard = {
  authorized: () => authNavigationGuard(AccessLevel.Authorized),
  unauthorized: () => authNavigationGuard(AccessLevel.Unauthorized),
};

export function authNavigationGuard(accessLevel: AccessLevel): NavigationGuardWithThis<undefined> {
  return (to, from, next) => {
    const currentAccessLevel = tokenManager.authenticated() ? AccessLevel.Authorized : AccessLevel.Unauthorized;
    return next(accessLevel === currentAccessLevel);
  };
}
