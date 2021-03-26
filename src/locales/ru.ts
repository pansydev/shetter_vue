import { AuthenticationErrorCode, RegistrationErrorCode } from "@shetter/models";

export default {
  errorMessages: {
    [AuthenticationErrorCode.InvalidCredentials]: "Неправильный логин или пароль",
    [RegistrationErrorCode.UserAlreadyExists]: "Пользователь с таким именем уже существует",
  },
};
