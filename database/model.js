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
  'listing_price_for_extra_person_native': Number,

  'available_days': Array,
}
);
	
const BookingModel = mongoose.model('Booking', BookingSchema);

var removeAll = function(callback) {
  BookingModel.remove({}, callback);
};

// function insertOne(data, callback) {
// 	BookingModel.create(data, callback)
// };

var insertOne = function(data) {
  return BookingModel.create(data);
};

// function findAll(callback) {
// 	BookingModel.find({})
// 		.exec(callback);
// };

var findAll = function() {
  return BookingModel.find({});
  // .exec(callback);
};

// function findOne(id, callback) {
//   BookingModel.find({id: id}, callback);
// }

var findOne = function(roomid) {
  console.log('find one called');
  return BookingModel.findOne({'id': roomid})
    .exec();
};

// function updateavailable_days(whereKey, equalsValue, updateKey, toValue, callback) {
//   BookingModel.where({null : null})
// 		.updateMany({updateKey : toValue})
// 		.exec(callback);
// };

var fakeAvailableDays = ['2/28/2018', '3/4/2018', '3/5/2018', 
  '3/7/2018', '3/18/2018', '3/19/2018', 
  '3/20/2018', '3/21/2018', '3/22/2018', 
  '3/23/2018', '4/9/2018', '4/10/2018'];

// function updateavailable_days(whereKey, equalsValue, toValue, callback) {
// 	BookingModel.where({whereKey: equalsValue})
// 	    .updateMany({'available_days' : toValue})
// 	    .exec(callback);
// };

var updateAllavailable_days = function(toValue) {
  return BookingModel.where({})
    .updateMany({'available_days' : toValue});
};

module.exports = {
  BookingSchema: BookingSchema,
  BookingModel: BookingModel,
  removeAll: removeAll,
  insertOne: insertOne,
  findAll: findAll,
  findOne: findOne,
  updateAllavailable_days: updateAllavailable_days
};

