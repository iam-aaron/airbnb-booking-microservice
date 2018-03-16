const faker = require('faker');
const fs = require('fs');
let file = fs.createWriteStream('./seedData/10millionrecords.json');
let start = process.hrtime();

let createListing = (id) => {
  let listing = {
    '_id': id,
    'city': faker.address.city(),
    'has_availability': faker.random.boolean(),
    'min_nights': 1,
    'max_nights': 5,
    'native_currency': 'USD',
    'person_capacity': 4,
    'price': faker.random.number({min: 40, max: 300}),
    'listing_weekend_price_native': faker.random.number({min: 40, max: 300}),
    'cleaning_fee_native': 30,
    'star_rating': faker.random.number({min: 1, max: 5}),
    'reviews_count': faker.random.number({min: 1, max: 30}),
    'weekly_price_factor': faker.random.number({min: 0.7, max: 1}),
    'listing_price_for_extra_person_native': 0,
    'available_days': [
      new Date(2018, 2, 7), new Date(2018, 2, 8), new Date(2018, 2, 9),
      new Date(2018, 2, 11), new Date(2018, 2, 12), new Date(2018, 2, 13),
      new Date(2018, 2, 15), new Date(2018, 2, 16), new Date(2018, 2, 19),
      new Date(2018, 2, 20), new Date(2018, 2, 21), new Date(2018, 2, 22),
      new Date(2018, 2, 25), new Date(2018, 2, 26), new Date(2018, 3, 1),
      new Date(2018, 3, 2), new Date(2018, 3, 3), new Date(2018, 3, 4),
      new Date(2018, 3, 5), new Date(2018, 3, 6), new Date(2018, 3, 7),
      new Date(2018, 3, 8), new Date(2018, 3, 9), new Date(2018, 3, 10),
      new Date(2018, 3, 11), new Date(2018, 3, 12), new Date(2018, 3, 13)],
  };
  return JSON.stringify(listing);
};

let writeTenMillion = (n = 10) => {
  let isReady = true;
  while (n > 0 && isReady) {
    isReady = file.write(`${createListing(n)}\n`);
    n -= 1;
  }
  file.once('drain', () => {
    writeTenMillion(n);
  });
};


writeTenMillion();


/*
* below is the previous version of the write function
*/

// let writeFiles = function(n) {
//   let filenames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
//
//   if (n === 11) {
//     return;
//   }
//   let file = fs.createWriteStream(`./seedData/${filenames[n - 1]}million.json`);
//   for (let i = (n - 1) * 1e6 + 1; i <= n * 1e6; i++) {
//     if (i === (n - 1) * 1e6 + 1) {
//       file.write('[' + createListing(i) + ',\n');
//     } else if (i === n * 1e6) {
//       file.write(createListing(i) + ']', () => {
//         setTimeout(() => {
//           writeFiles(n + 1);
//         }, 2000);
//         file.end();
//         let end = process.hrtime(start);
//         console.log(`process ${n} took ${end[0]} seconds`);
//       });
//     } else {
//       file.write(createListing(i) + ',\n');
//     }
//   }
// };
//
// writeFiles(1);

//array of file names
//call fun at end
//basew case - if you get to end of filename list (n === 11)
//update for loop to increment millions
