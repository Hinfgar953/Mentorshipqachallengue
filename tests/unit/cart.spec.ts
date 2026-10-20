import { test, expect } from "@playwright/test";
import { Cart } from "../../domain/Cart";
import { StandardCart } from "../../domain/StandardCart";
import { PremiumCart } from "../../domain/PremiumCart";

test("Give different totals for the same items depending the cart type", () => {
  const standardCart: Cart = new StandardCart(1, 1);
  const premiumCart: Cart = new PremiumCart(2, 1);
  for (const cart of [standardCart, premiumCart]) cart.addItem(10, 60, 2); 
  expect(standardCart.total).toBe(120);
  expect(premiumCart.discount).toBe(12);
  expect(premiumCart.total).toBe(108);
  expect([standardCart.describe(), premiumCart.describe()]).toEqual([
    "Cart #1 (user 1, standard): 2 item(s), total $120.00",
    "[PREMIUM] Cart #2 (user 1, premium): 2 item(s), total $108.00",
  ]);
});

test("Reject invalid quantities", () => {
  const cart = new StandardCart(1, 1);
   for (const quantity of [0, -1, 1.5]) {
    expect(() => cart.addItem(1, 10, quantity)).toThrow(
      "quantity must be a positive integer",
    );
  }

  expect(() => cart.addItem(1, 0)).toThrow(
    "unitPrice must be greater than 0",
  );
});


test("Reject unknown products on the cart", () => {
  const cart = new StandardCart(1, 1);
  cart.addItem(1, 10);
  cart.removeItem(1);
  expect(cart.items).toHaveLength(0);
  expect(() => cart.removeItem(1)).toThrow("is not in the cart");
});

test("Reject invalid users on the constructor", () => {
  expect(() => new StandardCart(1, 0)).toThrow("userId must be a positive integer");
});

