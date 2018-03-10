var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var bookingRouter = require('./bookingRouter.js');
var apiRouter = require('./apiRouter.js');
var morgan = require('morgan');
const path = require('path');

app.use(express.static(path.resolve('public')));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


var port = 3003;

app.use('/rooms', bookingRouter);
app.use('/api', apiRouter);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

