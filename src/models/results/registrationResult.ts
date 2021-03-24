import { TokenPair, User } from "@shetter/models";
import { OperationFailureResult } from "@shetter/models/results/shared";

export const enum RegistrationResultType {
  RegistrationSuccessResult = "RegistrationSuccessResult",
  RegistrationFailureResult = "RegistrationFailureResult",
}

export interface RegistrationSuccessResult {
  __typename: RegistrationResultType.RegistrationSuccessResult;
  user: User;
  tokens: TokenPair;
}

export interface RegistrationFailureResult extends OperationFailureResult {
  __typename: RegistrationResultType.RegistrationFailureResult;
}

export type RegistrationResult = RegistrationSuccessResult | RegistrationFailureResult;
