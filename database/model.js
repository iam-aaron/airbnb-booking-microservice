const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/airbnb_bookings');


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

