import { expect as baseExpect, Page } from "@playwright/test";
import { test as base } from "playwright-bdd";
import { ZodType } from "zod";
import { PageManager } from "../../page-objects/PageManager";
import { ProductsApi } from "../../api/ProductsApi";
import { ApiAuthorization } from "../../api/ApiAutorization";
import { MESSAGES } from "../../configs/constants";

//---------- custom matchers ----------
export const expect = baseExpect.extend({
  //logged in user = the page shows the "Login Successful" banner
  async toBeLoggedIn(page: Page, options?: { timeout?: number }) {
    const name = "toBeLoggedIn";
    let pass: boolean;
    let message: string | undefined;
    try {
      await baseExpect(page.getByTestId("login-success")).toContainText(MESSAGES.loginSuccess, options);
      pass = true;
    } catch (e: unknown) {
      message = (e as { matcherResult?: { message?: string } }).matcherResult?.message;
      pass = false;
    }
    return {
      name,
      pass,
      message: () => message ?? "Expected the user to be logged in",
    };
  },



  //sorted list of numbers (used for the ?sort= of the API)
  toBeSorted(received: number[], direction: "asc" | "desc" = "asc") {
    const expected = [...received].sort((a, b) => (direction === "asc" ? a - b : b - a));
    const pass = JSON.stringify(received) === JSON.stringify(expected);
    return {
      name: "toBeSorted",
      pass,
      message: () =>
        `Expected [${received.join(", ")}] ${pass ? "not " : ""}to be sorted ${direction}` +
        (pass ? "" : ` (expected [${expected.join(", ")}])`),
    };
  },
});

//---------- fixtures ----------
type Fixtures = {
  blockAds: void;
  pages: PageManager;
  productsApi: ProductsApi;
  ApiAuthorization: ApiAuthorization;
};

export const test = base.extend<Fixtures>({
  //auto fixture: qapractice.com shows Google ads, which slow the page down and can cover buttons
  blockAds: [
    async ({ context }, use) => {
      const adsPattern = /(doubleclick|googlesyndication|adtrafficquality|googleadservices)\./;

      //setup: block the ads for the whole life of the test
      await context.route(adsPattern, (route) => route.abort());
      await use();

      //teardown: runs after the test, even if it failed
      await context.unroute(adsPattern);
    },
    { auto: true },
  ],

  pages: async ({ page }, use) => {
    await use(new PageManager(page));
  },

  productsApi: async ({ request }, use) => {
    await use(new ProductsApi(request));
  },
});
