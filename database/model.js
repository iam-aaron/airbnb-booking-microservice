const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/airbnb_bookings');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const BookingSchema = mongoose.Schema(
	{
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

		'daysAvailable': Array,
	}
);
	
const BookingModel = mongoose.model('Booking', BookingSchema);

function removeAll(callback) {
	BookingModel.remove({}, callback)
};

// function insertOne(data, callback) {
// 	BookingModel.create(data, callback)
// };

function insertOne(data) {
	return BookingModel.create(data)
};

function findAll(callback) {
	BookingModel.find({})
		.exec(callback);
};

function findOne(id, callback) {
  BookingModel.find({id: id}, callback);
}

// function updateDaysAvailable(whereKey, equalsValue, updateKey, toValue, callback) {
// 	BookingModel.where({null : null})
// 		.updateMany({updateKey : toValue})
// 		.exec(callback);
// };

var fakeAvailableDays = ['2/28/2018', '3/4/2018', '3/5/2018', 
                      '3/7/2018', '3/18/2018', '3/19/2018', 
                      '3/20/2018', '3/21/2018', '3/22/2018', 
                      '3/23/2018', '4/9/2018', '4/10/2018'];

// function updateDaysAvailable(whereKey, equalsValue, toValue, callback) {
// 	BookingModel.where({whereKey: equalsValue})
// 	    .updateMany({'daysAvailable' : toValue})
// 	    .exec(callback);
// };

function updateAllDaysAvailable(toValue) {
	return BookingModel.where({})
	    .updateMany({'daysAvailable' : toValue})
};

module.exports = {
	BookingSchema: BookingSchema,
	BookingModel: BookingModel,
	removeAll: removeAll,
	insertOne: insertOne,
	findAll: findAll,
  findOne: findOne,
  updateAllDaysAvailable: updateAllDaysAvailable
};

