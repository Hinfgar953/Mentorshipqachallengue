import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { PaymentCard } from "./ShopPage";
import { Button } from "../elements/Button";
import { Checkbox } from "../elements/Checkbox";
import { Dropdown } from "../elements/Dropdown";
import { TextInput } from "../elements/TextInput";
import { ROUTES } from "../../configs/constants";

export interface FlightSearch {
  from: string;
  to: string;
  departureDate: string;
  oneWay?: boolean;
  passengers?: number;
  travelClass?: string;
}

export interface Passenger {
  name: string;
  email: string;
  phone: string;
}

export class FlightBookingPage extends BasePage {
  protected readonly path = ROUTES.flightBooking;

  //step 1: search
  readonly fromSelect = new Dropdown("From", this.byTestId("flight-from"));
  readonly toSelect = new Dropdown("To", this.byTestId("flight-to"));
  readonly departureDateInput = new TextInput("Departure date", this.byTestId("flight-departure-date"));
  readonly returnDateInput = new TextInput("Return date", this.byTestId("flight-return-date"));
  readonly passengersInput = new TextInput("Passengers", this.byTestId("flight-passengers"));
  readonly classSelect = new Dropdown("Class", this.byTestId("flight-class"));
  readonly oneWayCheckbox = new Checkbox("One way", this.byTestId("flight-one-way"));
  readonly searchButton = new Button("Search flights", this.byTestId("flight-search"));

  //step 2: results (every flight row has a test id like flight-result-GW100)
  readonly sortSelect = new Dropdown("Sort", this.byTestId("flight-sort"));
  readonly airlineFilter = new Dropdown("Airline", this.byTestId("flight-filter-airline"));
  readonly nonStopFilter = new Checkbox("Non-stop only", this.byTestId("flight-filter-nonstop"));
  //CSS "starts with" selector: getByTestId cannot match a prefix, so CSS is needed here
  readonly resultRows = this.page.locator('[data-testid^="flight-result-"]');
  readonly continueToPassengersButton = new Button(
    "Continue to passengers",
    this.byTestId("flight-continue-to-passengers"),
  );

  //step 3: passenger
  readonly passengerNameInput = new TextInput("Passenger name", this.byTestId("flight-passenger-name"));
  readonly passengerEmailInput = new TextInput("Passenger email", this.byTestId("flight-passenger-email"));
  readonly passengerPhoneInput = new TextInput("Passenger phone", this.byTestId("flight-passenger-phone"));
  private readonly continueToPaymentButton = new Button(
    "Continue to payment",
    this.byTestId("flight-continue-to-payment"),
  );

  //step 4: payment
  readonly total = this.byTestId("flight-total");
  readonly cardNumberInput = new TextInput("Card number", this.byTestId("flight-card-number"));
  private readonly expiryInput = new TextInput("Expiry", this.byTestId("flight-expiry"));
  private readonly cvvInput = new TextInput("CVV", this.byTestId("flight-cvv"));
  private readonly bookButton = new Button("Book", this.byTestId("flight-book"));

  //step 5: confirmation
  readonly bookingSuccess = this.byTestId("flight-booking-success");
  readonly pnr = this.byTestId("flight-pnr");

  //the flight numbers are stable, for example GW100
  selectButton(flightNumber: string): Button {
    return new Button(`Select ${flightNumber}`, this.byTestId(`flight-select-${flightNumber}`));
  }

  flightRow(flightNumber: string): Locator {
    return this.byTestId(`flight-result-${flightNumber}`);
  }

  //CHAINED locator: first the row of one flight (CSS), then the price text inside that row
  priceOf(flightNumber: string): Locator {
    return this.flightRow(flightNumber)
      .getByText(/\$\s*[\d,]+/)
      .first();
  }

  async searchFlights(search: FlightSearch): Promise<void> {
    await this.fromSelect.select(search.from);
    await this.toSelect.select(search.to);
    await this.departureDateInput.fill(search.departureDate);
    await this.oneWayCheckbox.setChecked(search.oneWay ?? true);
    if (search.passengers !== undefined) {
      await this.passengersInput.fill(String(search.passengers));
    }
    if (search.travelClass !== undefined) {
      await this.classSelect.select(search.travelClass);
    }
    await this.searchButton.click();
  }

  async selectFlight(flightNumber: string): Promise<void> {
    await this.selectButton(flightNumber).click();
  }

  async continueToPassengers(): Promise<void> {
    await this.continueToPassengersButton.click();
  }

  async fillPassenger(passenger: Passenger): Promise<void> {
    await this.passengerNameInput.fill(passenger.name);
    await this.passengerEmailInput.fill(passenger.email);
    await this.passengerPhoneInput.fill(passenger.phone);
    await this.continueToPaymentButton.click();
  }

  async pay(card: PaymentCard): Promise<void> {
    await this.cardNumberInput.fill(card.number);
    await this.expiryInput.fill(card.expiry);
    await this.cvvInput.fill(card.cvv);
    await this.bookButton.click();
  }

  //first "$" amount of every flight row, in the order the page shows them
  async getResultPrices(): Promise<number[]> {
    const rowTexts = await this.resultRows.allTextContents();
    return rowTexts.map((text) => {
      const match = text.match(/\$\s*([\d,]+(?:\.\d+)?)/);
      if (!match) {
        throw new Error(`No "$" price found in the flight row: "${text.trim()}"`);
      }
      return parseFloat(match[1].replace(/,/g, ""));
    });
  }

  //the last number of the total text, so "Total (2 passengers): $900.00" gives 900
  async getTotal(): Promise<number> {
    const text = (await this.total.textContent()) ?? "";
    const numbers = text.match(/\d[\d,]*\.?\d*/g);
    if (!numbers) {
      throw new Error(`No number found in the total: "${text.trim()}"`);
    }
    return parseFloat(numbers[numbers.length - 1].replace(/,/g, ""));
  }
}
