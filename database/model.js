const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/airbnb_bookings');
// let MONGO_SERVER = '172.18.0.2';
//       - MONGO_PORT=27017

mongoose.connect('mongodb://172.18.0.2:27017/airbnb_bookings');
// mongoose.connect('mongodb://localhost/airbnb_bookings');

// let mongoServer = process.env.MONGO_SERVER || 'localhost';
// console.log('mongoServer', mongoServer);
// let mongoPort = process.env.MONGO_PORT || '27017';
// console.log(`mongodb://${mongoServer}:${mongoPort}/airbnb_bookings`);
// mongoose.connect(`mongodb://${mongoServer}:${mongoPort}/airbnb_bookings`);


var BookingSchema = mongoose.Schema({
  'id': {type: Number, unique: true},
  'city': String,
  'has_availability': Boolean,
  'min_nights': Number,
  'max_nights': Number,
  'native_currency': String,
  'person_capacity': Number,
  'price': Number,
  'listing_weekend_price_native': Number,
  'cleaning_fee_native': Number,
  'star_rating': Number,
  'reviews_count': Number,
  'weekly_price_factor': Number,
  'listing_price_for_extra_person_native': Number,

  'available_days': Array,
});
  
const BookingModel = mongoose.model('Booking', BookingSchema);

var removeAll = function(callback) {
  BookingModel.remove({}, callback);
};

var insertOne = function(data) {
  return BookingModel.create(data);
};

var findAll = function() {
  return BookingModel.find({});
};

var findOne = function(roomid) {
  console.log('find one called');
  return BookingModel.findOne({'id': roomid})
    .exec();
};

module.exports = {
  BookingSchema: BookingSchema,
  BookingModel: BookingModel,
  removeAll: removeAll,
  insertOne: insertOne,
  findAll: findAll,
  findOne: findOne,
};

