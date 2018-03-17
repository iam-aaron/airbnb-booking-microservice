const faker = require('faker');
const fs = require('fs');
let listingfile = fs.createWriteStream('../seedData/listingsCSVrecords.csv');

let createListingsTable = (n) => {
  let id = n;
  let city = faker.address.city();
  let has_availability = faker.random.boolean();
  let min_nights = 1;
  let max_nights = 5;
  let native_currency = 'USD';
  let person_capacity = 4;
  let price = faker.random.number({min: 40, max: 300});
  let listing_weekend_price_native = faker.random.number({min: 40, max: 300});
  let cleaning_fee_native = 30;
  let star_rating = faker.random.number({min: 1, max: 5});
  let reviews_count = faker.random.number({min: 1, max: 30});
  let weekly_price_factor = faker.random.number({min: 0.7, max: 1});
  let listing_price_for_extra_person_native = 0;

  return (`${id},'${city}',${has_availability},${min_nights},${max_nights},'${native_currency}',${person_capacity},${price},${listing_weekend_price_native},${cleaning_fee_native},${star_rating},${reviews_count},${weekly_price_factor},${listing_price_for_extra_person_native}\n`);
};

let writeTenMillion = (n = 5e5) => {
  let isReady = true;
  if (n === 5e5) {
    listingfile.write(`id,city,has_availability,min_nights,max_nights,native_currency,person_capacity,price,listing_weekend_price_native,cleaning_fee_native,star_rating,reviews_count,weekly_price_factor,listing_price_for_extra_person_native
    \n`);
  }
  while (n > 0 && isReady) {
    isReady = listingfile.write(createListingsTable(n));
    n -= 1;
  }
  listingfile.once('drain', () => {
    writeTenMillion(n);
  });
};

writeTenMillion();
