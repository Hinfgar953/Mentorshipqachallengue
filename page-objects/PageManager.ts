import { Page } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { ShopPage } from "./pages/ShopPage";
import { FlightBookingPage } from "./pages/FlightBookingPage";

export class PageManager {
  readonly login: LoginPage;
  readonly shop: ShopPage;
  readonly flight: FlightBookingPage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.shop = new ShopPage(page);
    this.flight = new FlightBookingPage(page);
  }
}
