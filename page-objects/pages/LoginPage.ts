import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Button } from "../elements/Button";
import { TextInput } from "../elements/TextInput";
import { ROUTES } from "../../configs/constants";

export class LoginPage extends BasePage {
  protected readonly path = ROUTES.login;

  readonly emailInput = new TextInput("Email", this.byTestId("login-email"));
  readonly passwordInput = new TextInput("Password", this.byTestId("login-password"));
  readonly signInButton = new Button("Sign in", this.byTestId("login-submit"));

  //links have no test id, so we use the CSS tag "a" and filter it by its text
  readonly forgotPasswordLink = new Button(
    "Forgot password",
    this.page.locator("a", { hasText: "Forgot password?" }),
  );
  readonly registerLink = new Button("Register now", this.page.locator("a", { hasText: "Register now" }));

  readonly successMessage = this.byTestId("login-success");
  readonly errorMessage = this.byTestId("login-error");

  //the page shows either the success banner or the error, never both
  get message(): Locator {
    return this.successMessage.or(this.errorMessage);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
