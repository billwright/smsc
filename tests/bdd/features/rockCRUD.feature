Feature: CRUD for the Rocks

    Scenario: I can create a new Rock
        Given the server is running
        When I post the following data to the endpoint "/rock":
            | Name                 | GPS_coordinates     |
            | My New Rock <random> | 110.12345, 45.98765 |
        Then the post succeeds