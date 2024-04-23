Feature: Authenticated User

  Scenario: Loggin in
    When A user visit the home page
    Then They should see the home screen
    When A user clicks the login button
    Then They should see the login modal
    When A user enters correct login credentials
    Then They should be logged in

  Scenario: Add a seed
    When A user navigates to the seed page
    Then They should be on the seed page
    When A user clicks on add seed
    Then They should see the add seed modal
    When A user enters new seed information
    Then The new seed should be added

