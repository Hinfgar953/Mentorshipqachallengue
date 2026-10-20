import { createBdd } from "playwright-bdd";
import { test, expect } from "../../fixtures/test";
import { env } from "../../../configs/env";

const { Given, When, Then } = createBdd(test);

Given("I am on the login page", async ({ pages }) => {
  await pages.login.goto();
});

When("I log in with the valid credentials", async ({ pages }) => {
  await pages.login.login(env.ui.username, env.ui.password);
});

When(
  "I log in with email {string} and password {string}",
  async ({ pages }, email: string, password: string) => {
    await pages.login.login(email, password);
  },
);

When("I click the {string} link", async ({ page }, linkName: string) => {
  await page.locator("a", { hasText: linkName }).click();
});

Then("I should be logged in", async ({ page }) => {
  await expect(page).toBeLoggedIn();
});

Then("I should see the message {string}", async ({ pages }, message: string) => {
  await expect(pages.login.message).toContainText(message);
});

Then("I should be on the {string} page", async ({ page }, path: string) => {
  await expect(page).toHaveURL(new RegExp(`${path}$`));
});
