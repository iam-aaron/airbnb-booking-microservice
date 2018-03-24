const express = require('express');
const apiRouter = express.Router();
const mongoose = require('mongoose');
const db = require('../database/mongodb/listingModel.js');
// const db = require('../database/mysql/mySQLBookings.js');
const path = require('path');
const redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
  console.log('Error: ', err);
});

console.log('current working directory: ', path.resolve());
console.log('test: ', path.resolve('./public/index.html'));

apiRouter
  .route('/rooms/:roomid/bookings')
  .get((req, res, next) => {
    let id = req.params.roomid;
    // console.log('router get request received');
    client.get(id, function(error, result) {
      if (result) {
        console.log('REDIS RESULTS: ', JSON.parse(result));
        res.json(result);
      } else {
        db.findOne(id)
          .then((data) => {
            let dataString = JSON.stringify(data);
            client.setex(id, 60, dataString);
            console.log('API RESULTS: ', data);
            res.json(data);
            // console.log('ROUTER RECEIVED DATA: ', data);
          })
          .catch((err) => {
            console.log('there was an err in find one', err);
            res.status(404).json(err);
          });
      }
    });
  });

module.exports = apiRouter;
