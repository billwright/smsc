CREATE TABLE "userinfo" (
  "user_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100),
  "username" VARCHAR(100),
  "email" VARCHAR(100),
  "city" VARCHAR(100)
);

CREATE TABLE "trails" (
  "trail_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100),
  "location" VARCHAR(100),
  "length" DECIMAL,
  "elevation_gain" INT,
  "difficulty" VARCHAR(100),
  "avg_rating" DECIMAL
);

CREATE TABLE "reviews" (
  "review_id" SERIAL PRIMARY KEY,
  "trail_id" INT,
  "user_id" INT,
  "review" VARCHAR(200),
  "rating" DECIMAL
);

CREATE TABLE "images" (
  "image_id" SERIAL PRIMARY KEY,
  "review_id" INT,
  "image_url" VARCHAR(300),
  "image_caption" VARCHAR(200)
);

ALTER TABLE "reviews" ADD FOREIGN KEY ("trail_id") REFERENCES "trails" ("trail_id");

ALTER TABLE "images" ADD FOREIGN KEY ("review_id") REFERENCES "reviews" ("review_id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "userinfo" ("user_id");
