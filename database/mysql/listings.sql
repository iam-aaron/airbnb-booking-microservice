DROP DATABASE bookings;

CREATE DATABASE bookings;

USE bookings;

CREATE TABLE listings(
  id INT,
  city VARCHAR(30) NOT NULL,
  has_availability BIT NOT NULL,
  min_nights INT NOT NULL,
  max_nights INT NOT NULL,
  native_currency VARCHAR(10) NOT NULL,
  person_capacity INT NOT NULL,
  price INT NOT NULL,
  listing_weekend_price_native INT NOT NULL,
  cleaning_fee_native INT NOT NULL,
  star_rating INT NOT NULL,
  reviews_count INT NOT NULL,
  weekly_price_factor INT NOT NULL,
  listing_price_for_extra_person_native INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE dates(
  listing_id INT,
  avail_date VARCHAR(50),
  date_id INT AUTO_INCREMENT PRIMARY KEY,
  FOREIGN KEY (listing_id) REFERENCES listings(id)
);

ALTER TABLE listings
  ADD UNIQUE INDEX (id);

ALTER TABLE dates
  ADD UNIQUE INDEX (date_id);

LOAD DATA LOCAL INFILE '/Users/wseile/documents/github/thesis/sdc/whitney-booking/seedData/listingsCSVrecords.csv'
INTO TABLE listings
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/wseile/documents/github/thesis/sdc/whitney-booking/seedData/datesCSVrecords.csv'
INTO TABLE dates
FIELDS TERMINATED BY '*'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
