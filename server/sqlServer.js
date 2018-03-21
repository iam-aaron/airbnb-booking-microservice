var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'airbnb_bookings'
});

connection.connect()

connection.query(`SELECT * FROM dates, listings WHERE listings.id = dates.listing_id AND id = ${id}`, function (err, res) {
  if (err) {
    throw err
  } else {
    console.log(res);
  }
})

connection.end()
