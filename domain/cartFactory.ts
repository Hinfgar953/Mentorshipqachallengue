import { Cart } from "./Cart";
import { StandardCart } from "./StandardCart";
import { PremiumCart } from "./PremiumCart";

export type CartTier = "standard" | "premium";

//minimum shape we need from the API (the domain does not depend on Zod)
export interface CartData {
  id: number;
  userId: number;
  products: Array<{ productId: number; quantity: number }>;
}

const TIERS: Record<CartTier, new (id: number, userId: number) => Cart> = {
  standard: StandardCart,
  premium: PremiumCart,
};

//the carts API only brings productId + quantity; the caller gives the price (priceOf)
export function cartFromData(
  data: CartData,
  priceOf: (productId: number) => number,
  tier: CartTier = "standard",
): Cart {
  const cart = new TIERS[tier](data.id, data.userId);
  for (const line of data.products) {
    cart.addItem(line.productId, priceOf(line.productId), line.quantity);
  }
  return cart;
}
