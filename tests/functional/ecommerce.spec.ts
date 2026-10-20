import { test, expect } from "../fixtures/test";
import { env } from "../../configs/env";
import { MESSAGES } from "../../configs/constants";
import { ShopPage } from "../../page-objects/pages/ShopPage";
import { demoAddress, demoCard, WIRELESS_MOUSE_ID } from "../test-data/checkout.data";

/**
 * Scenarios:
 * 1.Add a product to the cart and remove it
 * 2.Proceed to buy is disabled when the cart is empty
 * 3.Search, filter by category and change the page
 * 4.Complete the checkout, and try to pay with empty card data
 * 5.Two shoppers (two browser contexts) have separate carts
 */

test.describe("E-commerce feature", () => {
  test.beforeEach("Open the store", async ({ pages }) => {
    await pages.shop.goto();
  });

  //teardown hook: when a test fails, attach the URL where it was
  test.afterEach("Attach the page URL when the test fails", async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await testInfo.attach("url-when-failed", { body: page.url(), contentType: "text/plain" });
    }
  });

  test("Add a product to the cart", async ({ pages }) => {
    await pages.shop.addToCart(WIRELESS_MOUSE_ID, 2);
    await pages.shop.openCart();

    await expect(pages.shop.removeFromCartButton(WIRELESS_MOUSE_ID).locator).toBeVisible();
  });

  test("Remove a product from the cart", async ({ pages }) => {
    await pages.shop.addToCart(WIRELESS_MOUSE_ID);
    await pages.shop.openCart();
    await pages.shop.removeFromCartButton(WIRELESS_MOUSE_ID).click();

    await expect(pages.shop.removeFromCartButton(WIRELESS_MOUSE_ID).locator).toHaveCount(0);
  });


  test("Filter the products by category", async ({ pages }) => {
    await pages.shop.categoryButton("fashion").click();
    await expect(pages.shop.addToCartButton(WIRELESS_MOUSE_ID).locator).toHaveCount(0);
    await pages.shop.categoryButton("electronics").click();
    await expect(pages.shop.addToCartButton(WIRELESS_MOUSE_ID).locator).toBeVisible();
  });


  test("Add a product and complete the checkout", async ({ pages }) => {
    await pages.shop.addToCart(WIRELESS_MOUSE_ID, 2);
    await pages.shop.checkout(demoAddress, demoCard);
    await expect(pages.shop.orderSuccess).toContainText(MESSAGES.orderSuccess);
  });

  test("Should not complete the order with empty card data", async ({ pages }) => {
    await pages.shop.addToCart(WIRELESS_MOUSE_ID);
    await pages.shop.checkout(demoAddress, { number: "", expiry: "", cvv: "" });
    await expect(pages.shop.orderSuccess).toHaveCount(0);
    await expect(pages.shop.cardNumberInput.locator).toBeVisible();
  });

  //uses the browser fixture: a second context is a second, isolated shopper
  test("Should keep the carts of two shoppers separate", async ({ pages, browser }) => {
    await pages.shop.addToCart(WIRELESS_MOUSE_ID);
    await pages.shop.openCart();
    await expect(pages.shop.removeFromCartButton(WIRELESS_MOUSE_ID).locator).toBeVisible();

    //a context created by hand does not get the baseURL of the config, so we pass it
    const otherContext = await browser.newContext({ baseURL: env.uiBaseUrl });
    try {
      const otherShop = new ShopPage(await otherContext.newPage());
      await otherShop.goto();
      await otherShop.openCart();

      await expect(otherShop.removeFromCartButton(WIRELESS_MOUSE_ID).locator).toHaveCount(0);
    } finally {
      //cleanup that always runs, even if the assertion fails (the test still fails)
      await otherContext.close();
    }
  });
});
