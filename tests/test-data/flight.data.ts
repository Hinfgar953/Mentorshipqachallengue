import { FlightSearch, Passenger } from "../../page-objects/pages/FlightBookingPage";
function futureDate(daysAhead: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().slice(0, 10);
}


export const FLIGHT_NUMBER = "GW100";

export const oneWayTrip: FlightSearch = {
  from: "New York",
  to: "London",
  departureDate: futureDate(30),
  oneWay: true,
};

export const demoPassenger: Passenger = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "+15550100",
};


export const invalidSearches = [
  { name: "no cities selected", from: "Select City", to: "Select City" },
  { name: "missing destination", from: "New York", to: "Select City" },
  { name: "same origin and destination", from: "Paris", to: "Paris" },
];
