mongoimport --db airbnb_bookings --collection listings --type json --file 10millionrecords.json

ab -c 50 -n 500 http://localhost:3003/rooms/126794/bookings
