let mongoose = require('mongoose');
let Listings = require('./listingModel.js');
let Bookings = require('./bookingModel.js');
let data = JSON.parse(require('./allListings.json'));
let Promise = require('bluebird');
mongoose.Promise = Promise;

var sampleAvailableDays = [
  new Date(2018, 3, 7), new Date(2018, 3, 8), new Date(2018, 3, 9),
  new Date(2018, 3, 11), new Date(2018, 3, 12), new Date(2018, 3, 13),
  new Date(2018, 3, 15), new Date(2018, 3, 16), new Date(2018, 3, 19),
  new Date(2018, 3, 20), new Date(2018, 3, 21), new Date(2018, 3, 22),
  new Date(2018, 3, 25), new Date(2018, 3, 26), new Date(2018, 3, 1),
  new Date(2018, 4, 2), new Date(2018, 4, 3), new Date(2018, 4, 4),
  new Date(2018, 4, 5), new Date(2018, 4, 6), new Date(2018, 4, 7),
  new Date(2018, 4, 8), new Date(2018, 4, 9), new Date(2018, 4, 10),
  new Date(2018, 4, 11), new Date(2018, 4, 12), new Date(2018, 4, 13),
  new Date(2018, 4, 15), new Date(2018, 4, 16), new Date(2018, 4, 17),
  new Date(2018, 4, 20), new Date(2018, 4, 21), new Date(2018, 4, 25),
];


var seedListingDb = function(data) {
  let connect;
  // let connection = mongoose.connect('mongodb://172.18.0.2:27017/airbnb_bookings')
  let connection = mongoose.connect('mongodb://localhost/airbnb_bookings')
    .then((c) => {
      connect = c;
      console.log('success connected to db!');
      // var BookingModel = Bookings.BookingModel;
      mongoose.Promise.map(data, (listing) => {
        console.log('boooking is: ', listing);
        listing.listing.available_days = sampleAvailableDays;
        return Bookings.insertOne(listing.listing);
      })
        .then(() => {
          console.log('Successfully seeded database!');
          return connect.disconnect();
        })
        .catch((err) => console.log('Error: listing insert', err));
    })
    .catch((err) => {
      console.log('Error: connection', err);
    });
};

seedListingDb(data);
