const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/airbnb_bookings');


var BookingSchema = mongoose.Schema({
  'name': String,
  'start_date': Date,
  'end_date': Date,
  'totalcost': Number,
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
