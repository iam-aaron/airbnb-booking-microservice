let mongoose = require('mongoose');
let Bookings = require('./model.js');
// var allListings = JSON.parse(require('./allListings.json'));
var data = JSON.parse(require('./allListings.json'));
// let Promise = require('bluebird');
// mongoose.Promise = Promise;

// mongoose.connect('mongodb://localhost/airbnb_bookings', (err) => {
//   if (err) 
//     throw err;
//   else 
//     console.log('Connected to Mongo! at airbnb_bookings');   
// });

// var myConnection = mongoose.connection;

// var BookingModel = Bookings.BookingModel;

var fakeAvailableDays = ['2/28/2018', '3/4/2018', '3/5/2018', 
                      '3/7/2018', '3/18/2018', '3/19/2018', 
                      '3/20/2018', '3/21/2018', '3/22/2018', 
                      '3/23/2018', '4/9/2018', '4/10/2018'];

// var seedDb = function() {
//   for (var i = 0; i < allListings.length; i++) {
//     Bookings.insertOne(allListings[i].listing, (err, data) => {
//       if (err) 
//         console.log('insertOne', err);
//       else {
//         console.log(i);
//         console.log('insertOne success!');
//         if (i === allListings.length - 1) {
//           console.log('if loop')
//           Bookings.updateDaysAvailable(null, null, fakeAvailableDays, (err, data) => {
//             console.log('Error:', err, 'Data:', data)
//           });    
//         }
//       } 
//     });
//   }

//   Bookings.findAll((err, data) => {
//   console.log('Error:', err, 'Data:', data);
//   });
  

// };

// myConnection.once('open', () => {
//   Bookings.removeAll( (err) => {console.log(err)});
//   seedDb();

// });

function insertOne(data) {
  return BookingModel.create(data)
};

const seedDb = function(data) {
  // let conn;
  // let connection = 
  mongoose.connect('mongodb://localhost/airbnb_bookings')
    .then(connection => {
      var BookingModel = Bookings.BookingModel;
      mongoose.Promise.map(data, (booking) => {
        return BookingModel.create(booking.listing)
        })
          // Bookings.insertOne(booking.listing);
      .then(() => {
        return 
          var all = BookingModel.where({}).updateMany('daysAvailable', fakeAvailableDays);
      })
      .then(() => {
        return connection.disconnect();
      })
      .catch(err => console.log('Error inserting data ', err));
    })
    .catch(err => {
      console.log('Error opening the connection ', err);
    });
};

seedDb(data);








