import { TokenPair } from "@shetter/models";

export const enum AuthenticationResultType {
  AuthenticationSuccessResult = "AuthenticationSuccessResult",
  AuthenticationFailureResult = "AuthenticationFailureResult",
}

export const enum AuthenticationErrorCode {
  InvalidCredentials = "Authentication:InvalidCredentials",
}

export interface AuthenticationSuccessResult {
  readonly __typename: AuthenticationResultType.AuthenticationSuccessResult;
  readonly tokens: TokenPair;
}

export interface AuthenticationFailureResult {
  readonly __typename: AuthenticationResultType.AuthenticationFailureResult;
  readonly code: AuthenticationErrorCode;
}

export type AuthenticationResult = AuthenticationSuccessResult | AuthenticationFailureResult;
