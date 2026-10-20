Feature: Login to qa practice excercise
  As a qa practice user
  I want to log in with my email and password
  So that I can access my account

  Scenario: login Successfully
    Given I am on the login page
    When I log in with the valid credentials
    Then I should be logged in
    And I should see the message "Login Successful"

  Scenario Outline: Login is rejected with invalid or incomplete data
    Given I am on the login page
    When I log in with email "<email>" and password "<password>"
    Then I should see the message "<message>"

    Examples:
       email                password      message                
       someone@example.com                Password is required            
                            any-password  Email is required               
       wrong@example.com    contransea          Invalid email id and password   

