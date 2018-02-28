module.exports = [
	{
		'id': Number,
    'city': String,
  	'has_availability': Boolean,
		'min_nights': Number,
		'max_night': Number,
		'currency': String,
    'person_capacity': Number,
		'price': Number,
  	'listing_weekend_price_native': Number,
  	'cleaning_fee_native': Number,
    'star_rating': Number,
  	'listing_price_for_extra_person_native': Number,

		'daysAvailable': Array,
	}
];
    // 'instant_bookable': true,
		// 'pricing': {
  // extras_price_native: 28,
  // listing_cleaning_fee_native: 28,
			// 'service_fee': Number,
			// 'can_instant_book': Boolean,
		 	// 'long_term_discount_amount_as_guest': Number,
  // listing_monthly_price_native: null,
  // price_for_extra_person_native: 0,

  // listing_security_deposit_native: 0,
  // listing_weekly_price_native: null,
  // monthly_price_factor: 0.78,
  // weekly_price_factor: 0.83,
		// }