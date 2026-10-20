import { Cart } from "./Cart";
import { PREMIUM_RULES } from "../configs/constants";

export class PremiumCart extends Cart {
  get tier(): string {
    return "premium";
  }

  protected override calculateDiscount(subtotal: number): number {
    return subtotal >= PREMIUM_RULES.threshold ? subtotal * PREMIUM_RULES.rate : 0;
  }

  //OVERRIDE: replaces describe() of the parent, reusing it with super
  override describe(): string {
    return `[PREMIUM] ${super.describe()}`;
  }
}
