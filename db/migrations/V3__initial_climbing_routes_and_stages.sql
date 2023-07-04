-- Climbing Route Table 
-- (name, rock_id, rating, length, number_of_pitches)
INSERT INTO climbing_route VALUES (DEFAULT, 'Direct East Face', 1, '5.6', 1300, 10);
INSERT INTO climbing_route VALUES (DEFAULT, 'Atalanta', 1, '5.2', 400, 4);
INSERT INTO climbing_route VALUES (DEFAULT, 'Syzygy', 2, '5.5', 700, 5);
INSERT INTO climbing_route VALUES (DEFAULT, 'East Face - South Side', 3, '5.5', 600, 4);
INSERT INTO climbing_route VALUES (DEFAULT, 'East Face', 4, '5.4', 300, 2);
INSERT INTO climbing_route VALUES (DEFAULT, 'Freeway', 7, '5.1', 900, 7);

-- Stage Table
-- (tour_id, stage_number, start_time, name)
INSERT INTO stage VALUES (DEFAULT, 1, 2, '2022-09-14 5:30 PM', 'First Flatiron Frenzy');
INSERT INTO stage VALUES (DEFAULT, 1, 1, '2022-09-07 5:30 PM', 'Slab -> Seal');
INSERT INTO stage VALUES (DEFAULT, 1, 3, '2022-09-21 5:30 PM', 'Dinosaur Mountain Madness');
INSERT INTO stage VALUES (DEFAULT, 1, 4, '2022-09-28 5:30 PM', 'Freeway');
