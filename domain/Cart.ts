export interface CartLine {
  readonly productId: number;
  readonly unitPrice: number;
  quantity: number;
}

const round2 = (n: number): number => Math.round(n * 100) / 100;

export abstract class Cart {
  //static: counts how many carts have been created in total
  private static created = 0;
  static get createdCount(): number {
    return Cart.created;
  }

  //encapsulation: the lines only change through addItem / removeItem
  private readonly lines = new Map<number, CartLine>();

  constructor(
    public readonly id: number,
    public readonly userId: number,
  ) {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new Error("userId must be a positive integer");
    }
    Cart.created++;
  }

  addItem(productId: number, unitPrice: number, quantity = 1): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("quantity must be a positive integer");
    }
    if (!(unitPrice > 0)) {
      throw new Error("unitPrice must be greater than 0");
    }
    const current = this.lines.get(productId);
    if (current && current.unitPrice !== unitPrice) {
      throw new Error(`price mismatch for product ${productId}`);
    }
    this.lines.set(productId, {
      productId,
      unitPrice,
      quantity: (current?.quantity ?? 0) + quantity,
    });
  }

  removeItem(productId: number): void {
    if (!this.lines.delete(productId)) {
      throw new Error(`product ${productId} is not in the cart`);
    }
  }

  get items(): readonly CartLine[] {
    return [...this.lines.values()];
  }

  get itemCount(): number {
    return this.items.reduce((sum, line) => sum + line.quantity, 0);
  }

  get subtotal(): number {
    return round2(this.items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0));
  }

  get discount(): number {
    return round2(this.calculateDiscount(this.subtotal));
  }

  get total(): number {
    return round2(this.subtotal - this.discount);
  }

  //abstract: each cart type defines its name and its discount rule
  abstract get tier(): string;
  protected abstract calculateDiscount(subtotal: number): number;

  describe(): string {
    return `Cart #${this.id} (user ${this.userId}, ${this.tier}): ${this.itemCount} item(s), total $${this.total.toFixed(2)}`;
  }
}
