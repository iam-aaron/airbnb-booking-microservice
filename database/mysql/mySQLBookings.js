var mysql = require('mysql');
var Bluebird = require('bluebird');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bookings'
});

global.db = Bluebird.promisifyAll((connection));

connection.connect();
console.log('connected to bookings');

const findOne = (id) => {
  let dates = [];
  return db.queryAsync(`SELECT * FROM listings, dates WHERE listings.id = dates.listing_id and id = ${id}`)
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        dates.push(data[i].avail_date);
      }
      let info = {
        '_id': data[0].id,
        'city': data[0].city,
        'has_availability': data[0].has_availability,
        'min_nights': data[0].min_nights,
        'max_nights': data[0].max_nights,
        'native_currency': data[0].native_currency,
        'person_capacity': data[0].person_capacity,
        'price': data[0].price,
        'listing_weekend_price_native': data[0].listing_weekend_price_native,
        'cleaning_fee_native': data[0].cleaning_fee_native,
        'star_rating': data[0].star_rating,
        'reviews_count': data[0].reviews_count,
        'weekly_price_factor': data[0].weekly_price_factor,
        'listing_price_for_extra_person_native': data[0].listing_price_for_extra_person_native,
        'available_days': dates,
      };
      return info;
    });
    // console.log(info);
};



exports.findOne = findOne;
exports.connection = connection;
