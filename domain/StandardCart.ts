import { Cart } from "./Cart";

export class StandardCart extends Cart {
  get tier(): string {
    return "standard";
  }

  protected calculateDiscount(): number {
    return 0;
  }
}
