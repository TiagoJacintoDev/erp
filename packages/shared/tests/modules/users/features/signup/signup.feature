Feature: Signup
  As a new user,
  I want to register as a Member
  So that I can access the site

  @backend @frontend
  Scenario: Successful signup
    Given I am a new user
    When I register with valid account details
    Then I should see a success message
    And I should receive a confirmation email

  @backend @frontend
  Scenario: Invalid or missing registration details
    Given I am a new user
    When I register with invalid account details
    Then I should see an error notifying me that my input is invalid
    And I should not receive a confirmation email

  @backend @frontend
  Scenario: Account already created with email
    Given a set of users already created accounts
      | email             |
      | john@example.com  |
      | alice@example.com |
      | david@example.com |
    When new users attempt to register with those emails
    Then they should see an error notifying them that the account already exists
    And they should not receive a confirmation email
