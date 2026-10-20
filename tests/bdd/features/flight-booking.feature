Feature: Book a flight
  As a traveller
  I want to search and book a flight
  So that I get a booking reference

  Scenario: Book a one-way flight
    Given I am on the flight booking page
    When I search for a one-way flight from "New York" to "London"
    And I select the flight "GW100"
    And I enter the demo passenger details
    And I pay with the demo card
    Then I should see the booking confirmation "Booking Confirmed"
    And I should get a booking reference

  Scenario Outline: The search is rejected for missing or identical cities
    Given I am on the flight booking page
    When I search for a one-way flight from "<from>" to "<to>"
    Then I should stay in the search step

    Examples:
    from        to       
     New York     Select City 
     Paris        Paris       