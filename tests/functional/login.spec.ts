import { test, expect } from "../fixtures/test";
import { env } from "../../configs/env";
import { MESSAGES, ROUTES } from "../../configs/constants";

test.describe("Login feature", () => {
  test.beforeEach("Open login page", async ({ pages }) => {
    await pages.login.goto();
  });

  test("Login with valid credentials", async ({ pages, page }) => {
    await pages.login.login(env.ui.username, env.ui.password);
    await expect(pages.login.successMessage).toContainText(MESSAGES.loginSuccess);
    await expect(page).toBeLoggedIn();
  });


  test("Verify password is masked", async ({ pages }) => {
    await pages.login.passwordInput.fill("secret-text");
    await expect(pages.login.passwordInput.locator).toHaveAttribute("type", "password");
  });

  test("Go to register page", async ({ pages, page }) => {
    await pages.login.registerLink.click();
    await expect(page).toHaveURL(new RegExp(`${ROUTES.register}$`));
  });
});
