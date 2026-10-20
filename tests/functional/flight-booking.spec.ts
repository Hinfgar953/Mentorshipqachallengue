import { test, expect } from "../fixtures/test";
import { MESSAGES } from "../../configs/constants";
import { demoCard } from "../test-data/checkout.data";
import { FLIGHT_NUMBER, demoPassenger, invalidSearches, oneWayTrip } from "../test-data/flight.data";
test.describe("Flight booking feature", () => {
  test.beforeEach("Open flight booking page", async ({ pages }) => {
    await pages.flight.goto();
  });

  test("Book a fly and confirm", async ({ pages }) => {
    await pages.flight.searchFlights(oneWayTrip);
    await pages.flight.selectFlight(FLIGHT_NUMBER);
    await pages.flight.continueToPassengers();
    await pages.flight.fillPassenger(demoPassenger);
    await pages.flight.pay(demoCard);
    await expect(pages.flight.bookingSuccess).toContainText(MESSAGES.bookingConfirmed);
    await expect(pages.flight.pnr).not.toBeEmpty();
  });


  test("Sort flights by price from low to high", async ({ pages }) => {
    await pages.flight.searchFlights(oneWayTrip);
    await expect(pages.flight.resultRows.first()).toBeVisible();
    await pages.flight.sortSelect.select("price-asc");
    await expect(pages.flight.priceOf(FLIGHT_NUMBER)).toBeVisible();
    const prices = await pages.flight.getResultPrices();
    expect(prices.length).toBeGreaterThan(1);
    expect(prices).toBeSorted("asc");
  });

  test("Filter flights by 'non-stop'", async ({ pages }) => {
    await pages.flight.searchFlights(oneWayTrip);
    await expect(pages.flight.resultRows.first()).toBeVisible();
    const flightsBefore = await pages.flight.resultRows.count();
    await pages.flight.nonStopFilter.setChecked(true);
    await expect.poll(() => pages.flight.resultRows.count()).toBeLessThanOrEqual(flightsBefore);
    expect(await pages.flight.resultRows.count()).toBeGreaterThan(0);
  });

  test("Should show only the flights of the selected airline", async ({ pages }) => {
    await pages.flight.searchFlights(oneWayTrip);
    await expect(pages.flight.resultRows.first()).toBeVisible();
    await pages.flight.airlineFilter.select("BlueJet");
    await expect(pages.flight.resultRows.first()).toContainText("BlueJet");
    for (const row of await pages.flight.resultRows.all()) {
      await expect(row).toContainText("BlueJet");
    }
  });

  test("Search for a non existing flight and display error", async ({ pages }) => {
    await pages.flight.searchFlights(oneWayTrip);
    await expect(pages.flight.resultRows.first()).toBeVisible();
    await expect(pages.flight.airlineFilter.select("NoSuchAirline", 1_000)).rejects.toThrow("not available");
  });

});
