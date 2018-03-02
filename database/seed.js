let mongoose = require('mongoose');
let Bookings = require('./model.js');
var data = JSON.parse(require('./allListings.json'));

var fakeAvailableDays = ['2/28/2018', '3/4/2018', '3/5/2018', 
  '3/7/2018', '3/18/2018', '3/19/2018', 
  '3/20/2018', '3/21/2018', '3/22/2018', 
  '3/23/2018', '4/9/2018', '4/10/2018'
];

var insertOne = function(data) {
  return BookingModel.create(data);
};

var seedDb = function(data) {
  mongoose.connect('mongodb://localhost/airbnb_bookings')
    .then(connection => {
      var BookingModel = Bookings.BookingModel;
      mongoose.Promise.map(data, (booking) => {
        booking.listing.available_days = fakeAvailableDays;
        return BookingModel.create(booking.listing);
      })
        .then(() => {
          return connection.disconnect();
        })
        .catch((err) => console.log('Error: listing insert', err));
    })
    .catch((err) => {
      console.log('Error: connection', err);
    });
};

seedDb(data);








