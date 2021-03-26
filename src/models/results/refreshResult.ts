import { TokenPair } from "@shetter/models";

export const enum RefreshResultType {
  RefreshSuccessResult = "RefreshSuccessResult",
  RefreshFailureResult = "RefreshFailureResult",
}

export const enum RefreshErrorCode {
  InvalidRefreshToken = "Refresh:InvalidRefreshToken",
}

export interface RefreshSuccessResult {
  readonly __typename: RefreshResultType.RefreshSuccessResult;
  readonly tokens: TokenPair;
}

export interface RefreshFailureResult {
  readonly __typename: RefreshResultType.RefreshFailureResult;
  readonly code: RefreshErrorCode;
}

export type RefreshResult = RefreshSuccessResult | RefreshFailureResult;
