import { TokenPair } from "@shetter/models";

export const enum RegistrationResultType {
  RegistrationSuccessResult = "RegistrationSuccessResult",
  RegistrationFailureResult = "RegistrationFailureResult",
}

export const enum RegistrationErrorCode {
  UserAlreadyExists = "Registration:UserAlreadyExists",
}

export interface RegistrationSuccessResult {
  readonly __typename: RegistrationResultType.RegistrationSuccessResult;
  readonly tokens: TokenPair;
}

export interface RegistrationFailureResult {
  readonly __typename: RegistrationResultType.RegistrationFailureResult;
  readonly code: RegistrationErrorCode;
}

export type RegistrationResult = RegistrationSuccessResult | RegistrationFailureResult;
