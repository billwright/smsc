CREATE TABLE rock (
  id SERIAL PRIMARY KEY,
  name varchar UNIQUE,
  gps_coordinates varchar
);

CREATE TABLE minion (
  id SERIAL PRIMARY KEY,
  nickname varchar UNIQUE,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  email varchar UNIQUE NOT NULL,
  role varchar DEFAULT 'minion',
  created_at timestamp DEFAULT NOW()
);

CREATE TABLE tour (
  id SERIAL PRIMARY KEY,
  year_of integer NOT NULL
);

CREATE TABLE stage (
  id SERIAL PRIMARY KEY,
  name varchar UNIQUE
);

-- A Tour has five Stages, which will all be unique for a given Tour,
-- but a Stage can be part of multiple Tours. Hence, this is the
-- many-to-many merge/join table.
CREATE TABLE tour_stage (
      id SERIAL PRIMARY KEY,
      tour_id integer,
      stage_id integer,
      stage_number integer,
      start_time timestamp
);

CREATE TABLE climbing_route (
  id SERIAL PRIMARY KEY,
  name varchar,
  rock_id integer,
  rating varchar,
  length_in_feet integer,
  number_of_pitches integer
);


CREATE TABLE stage_route (
  stage_id integer,
  climbing_route_id integer,
  route_sequence integer
);

CREATE TABLE result (
  tour_stage_id integer,
  minion_id integer,
  elapsed_time interval
);

ALTER TABLE climbing_route ADD FOREIGN KEY (rock_id) REFERENCES rock (id);

ALTER TABLE stage_route ADD FOREIGN KEY (stage_id) REFERENCES stage (id);

ALTER TABLE stage_route ADD FOREIGN KEY (climbing_route_id) REFERENCES climbing_route (id);

ALTER TABLE tour_stage ADD FOREIGN KEY (tour_id) REFERENCES tour (id);
ALTER TABLE tour_stage ADD FOREIGN KEY (stage_id) REFERENCES stage (id);

ALTER TABLE result ADD FOREIGN KEY (minion_id) REFERENCES minion (id);

ALTER TABLE result ADD FOREIGN KEY (tour_stage_id) REFERENCES tour_stage (id);

