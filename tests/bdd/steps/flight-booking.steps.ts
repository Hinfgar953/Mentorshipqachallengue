import { createBdd } from "playwright-bdd";
import { test, expect } from "../../fixtures/test";
import { demoCard } from "../../test-data/checkout.data";
import { demoPassenger, oneWayTrip } from "../../test-data/flight.data";

const { Given, When, Then } = createBdd(test);

Given("I am on the flight booking page", async ({ pages }) => {
  await pages.flight.goto();
});

When(
  "I search for a one-way flight from {string} to {string}",
  async ({ pages }, from: string, to: string) => {
    await pages.flight.searchFlights({ ...oneWayTrip, from, to });
  },
);

When("I select the flight {string}", async ({ pages }, flightNumber: string) => {
  await pages.flight.selectFlight(flightNumber);
  await pages.flight.continueToPassengers();
});

When("I enter the demo passenger details", async ({ pages }) => {
  await pages.flight.fillPassenger(demoPassenger);
});

When("I pay with the demo card", async ({ pages }) => {
  await pages.flight.pay(demoCard);
});

Then("I should see the booking confirmation {string}", async ({ pages }, message: string) => {
  await expect(pages.flight.bookingSuccess).toContainText(message);
});

Then("I should get a booking reference", async ({ pages }) => {
  await expect(pages.flight.pnr).not.toBeEmpty();
});

Then("I should stay in the search step", async ({ pages }) => {
  await expect(pages.flight.sortSelect.locator).toHaveCount(0);
});
