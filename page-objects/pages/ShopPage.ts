import { BasePage } from "./BasePage";
import { Button } from "../elements/Button";
import { TextInput } from "../elements/TextInput";
import { ROUTES } from "../../configs/constants";

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface PaymentCard {
  number: string;
  expiry: string;
  cvv: string;
}

export class ShopPage extends BasePage {
  protected readonly path = ROUTES.shop;

  readonly searchBox = new TextInput("Search", this.byTestId("ecom-search"));
  readonly cartButton = new Button("Cart", this.byTestId("ecom-cart-button"));
  readonly proceedToBuyButton = new Button("Proceed to Buy", this.byTestId("ecom-proceed-to-buy"));
  readonly cardNumberInput = new TextInput("Card number", this.byTestId("ecom-card-number"));
  readonly orderSuccess = this.byTestId("ecom-order-success");

  private readonly addressNameInput = new TextInput("Address name", this.byTestId("ecom-address-name"));
  private readonly addressStreetInput = new TextInput("Street", this.byTestId("ecom-address-street"));
  private readonly addressCityInput = new TextInput("City", this.byTestId("ecom-address-city"));
  private readonly addressStateInput = new TextInput("State", this.byTestId("ecom-address-state"));
  private readonly addressZipInput = new TextInput("Zip", this.byTestId("ecom-address-zip"));
  private readonly saveAddressButton = new Button("Save address", this.byTestId("ecom-save-address"));
  private readonly expiryInput = new TextInput("Expiry", this.byTestId("ecom-expiry"));
  private readonly cvvInput = new TextInput("CVV", this.byTestId("ecom-cvv"));
  private readonly buyNowButton = new Button("Buy now", this.byTestId("ecom-buy-now"));

  //products have a numeric id in their test ids, for example add-to-cart-2 is the Wireless Mouse
  addToCartButton(productId: number): Button {
    return new Button(`Add to cart ${productId}`, this.byTestId(`add-to-cart-${productId}`));
  }

  quantityInput(productId: number): TextInput {
    return new TextInput(`Quantity ${productId}`, this.byTestId(`quantity-${productId}`));
  }

  removeFromCartButton(productId: number): Button {
    return new Button(`Remove ${productId}`, this.byTestId(`remove-from-cart-${productId}`));
  }

  categoryButton(category: string): Button {
    return new Button(`Category ${category}`, this.byTestId(`ecom-category-${category.toLowerCase()}`));
  }

  pageButton(pageNumber: number): Button {
    return new Button(`Page ${pageNumber}`, this.byTestId(`ecom-page-${pageNumber}`));
  }

  async addToCart(productId: number, quantity = 1): Promise<void> {
    await this.quantityInput(productId).fill(String(quantity));
    await this.addToCartButton(productId).click();
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }

  private async typeAddressField(input: TextInput, value: string): Promise<void> {
    await input.locator.click();
    await input.locator.press("Control+A");
    await input.locator.pressSequentially(value);
  }

  async fillAddress(address: ShippingAddress): Promise<void> {
    await this.addressNameInput.waitUntilVisible();
    await this.typeAddressField(this.addressNameInput, address.name);
    await this.typeAddressField(this.addressStreetInput, address.street);
    await this.typeAddressField(this.addressCityInput, address.city);
    await this.typeAddressField(this.addressStateInput, address.state);
    await this.typeAddressField(this.addressZipInput, address.zip);
    await this.saveAddressButton.click();
  }

  async pay(card: PaymentCard): Promise<void> {
    await this.cardNumberInput.fill(card.number);
    await this.expiryInput.fill(card.expiry);
    await this.cvvInput.fill(card.cvv);
    await this.buyNowButton.click();
  }

  //cart -> proceed to buy -> address -> payment
  async checkout(address: ShippingAddress, card: PaymentCard): Promise<void> {
    await this.openCart();
    await this.proceedToBuyButton.click();
    await this.fillAddress(address);
    await this.pay(card);
  }
}
