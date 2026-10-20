import { env } from "../../configs/env";
import { MESSAGES } from "../../configs/constants";

export const invalidLoginCases = [
  { name: "both fields empty", email: "", password: "", message: MESSAGES.emailAndPasswordRequired },
  { name: "missing password", email: env.ui.username, password: "", message: MESSAGES.passwordRequired },
  { name: "missing email", email: "", password: "any-password", message: MESSAGES.emailRequired },
  { name: "wrong credentials", email: "wrong@example.com", password: "nope", message: MESSAGES.invalidCredentials },
];
