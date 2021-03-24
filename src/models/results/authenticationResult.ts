import { TokenPair } from "@shetter/models";
import { OperationFailureResult } from "@shetter/models/results/shared";

export const enum AuthenticationResultType {
  AuthenticationSuccessResult = "AuthenticationSuccessResult",
  AuthenticationFailureResult = "AuthenticationFailureResult",
}

export interface AuthenticationSuccessResult {
  __typename: AuthenticationResultType.AuthenticationSuccessResult;
  tokens: TokenPair;
}

export interface AuthenticationFailureResult extends OperationFailureResult {
  __typename: AuthenticationResultType.AuthenticationFailureResult;
}

export type AuthenticationResult = AuthenticationSuccessResult | AuthenticationFailureResult;
