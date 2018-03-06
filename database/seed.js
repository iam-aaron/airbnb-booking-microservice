let mongoose = require('mongoose');
let Bookings = require('./model.js');
let data = JSON.parse(require('./allListings.json'));
let Promise = require('bluebird');

var sampleAvailableDays = [
  new Date(2018, 2, 7), new Date(2018, 2, 8), new Date(2018, 2, 9), 
  new Date(2018, 2, 11), new Date(2018, 2, 12), new Date(2018, 2, 13),
  new Date(2018, 2, 15), new Date(2018, 2, 16), new Date(2018, 2, 19),
  new Date(2018, 2, 20), new Date(2018, 2, 21), new Date(2018, 2, 22),
  new Date(2018, 2, 25), new Date(2018, 2, 26), new Date(2018, 3, 1),
  new Date(2018, 3, 2), new Date(2018, 3, 3), new Date(2018, 3, 4),
  new Date(2018, 3, 5), new Date(2018, 3, 6), new Date(2018, 3, 7),
  new Date(2018, 3, 8), new Date(2018, 3, 9), new Date(2018, 3, 10),
  new Date(2018, 3, 11), new Date(2018, 3, 12), new Date(2018, 3, 13),
];


var seedDb = function(data) {
  mongoose.connect('mongodb://localhost/airbnb_bookings')
    .then((connection) => {
      connect = connection;
      var BookingModel = Bookings.BookingModel;
      mongoose.Promise.map(data, (booking) => {
        booking.listing.available_days = sampleAvailableDays;
        return BookingModel.create(booking.listing);
      })
        .then(() => {
          return connect.disconnect();
        })
        .catch((err) => console.log('Error: listing insert', err));
    })
    .catch((err) => {
      console.log('Error: connection', err);
    });
};

seedDb(data);
