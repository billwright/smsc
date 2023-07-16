Feature: Endpoint to return prime factors

    Scenario: I can get prime factors for 6
        Given an input number of 6
        When I get the prime factors from the endpoint
        Then the REST call succeeds
        And the prime factors returned are:
            | 2 |
            | 3 |

    Scenario: I can get prime factors 3
        Given an input number of 3
        When I get the prime factors from the endpoint
        Then the REST call succeeds
        And the prime factors returned are:
            | 3 |

    Scenario: I can get prime factors of 210
        Given an input number of 210
        When I get the prime factors from the endpoint
        Then the REST call succeeds
        And the prime factors returned are:
            | 2 |
            | 3 |
            | 5 |
            | 7 |