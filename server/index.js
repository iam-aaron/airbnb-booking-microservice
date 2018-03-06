var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var bookingRouter = require('./router.js');
var morgan = require('morgan');

app.use(express.static(__dirname + '/../client/dist'));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


var port = 3003;

app.use('/rooms', bookingRouter);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

