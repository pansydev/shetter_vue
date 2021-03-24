import { TokenPair } from "@shetter/models";
import { OperationFailureResult } from "@shetter/models/results/shared";

export const enum RefreshResultType {
  RefreshSuccessResult = "RefreshSuccessResult",
  RefreshFailureResult = "RefreshFailureResult",
}

export interface RefreshSuccessResult {
  __typename: RefreshResultType.RefreshSuccessResult;
  tokens: TokenPair;
}

export interface RefreshFailureResult extends OperationFailureResult {
  __typename: RefreshResultType.RefreshFailureResult;
}

export type RefreshResult = RefreshSuccessResult | RefreshFailureResult;
