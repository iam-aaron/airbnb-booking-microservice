var express = require('express');
var bookingRouter = express.Router();
var mongoose = require('mongoose');
var db = require('../database/model.js');

bookingRouter
  .route('/:roomid/bookings')
  .get((req, res, next) => {
    db.findOne(req.params.roomid)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log('there was an err in find one', err);
        res.status(404).json(err);
      });
  }
  );

module.exports = bookingRouter;


