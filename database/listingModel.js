const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/airbnb_bookings');
// let MONGO_SERVER = '172.18.0.2';
//       - MONGO_PORT=27017

// mongoose.connect('mongodb://172.18.0.2:27017/airbnb_bookings');
mongoose.connect('mongodb://localhost/airbnb_bookings');

// let mongoServer = process.env.MONGO_SERVER || 'localhost';
// console.log('mongoServer', mongoServer);
// let mongoPort = process.env.MONGO_PORT || '27017';
// console.log(`mongodb://${mongoServer}:${mongoPort}/airbnb_bookings`);
// mongoose.connect(`mongodb://${mongoServer}:${mongoPort}/airbnb_bookings`);

var ListingSchema = mongoose.Schema({
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

const ListingModel = mongoose.model('Listing', ListingSchema);

var removeAll = function(callback) {
  ListingModel.remove({}, callback);
};

var insertOne = function(data) {
  return ListingModel.create(data);
};

var findAll = function() {
  return ListingModel.find({});
};

var findOne = function(roomid) {
  console.log('find one called on:', roomid);
  return ListingModel.findOne({'id': roomid})
    .exec();
};

module.exports = {
  ListingSchema: ListingSchema,
  ListingModel: ListingModel,
  removeAll: removeAll,
  insertOne: insertOne,
  findAll: findAll,
  findOne: findOne,
};
