const express = require('express');
const bookingRouter = express.Router();
const mongoose = require('mongoose');
const db = require('../database/model.js');
const path = require('path');

console.log('current working directory: ', path.resolve());
console.log('test: ', path.resolve('./public/index.html'));

bookingRouter
  .route('/:roomid/bookings')
  .get((req, res, next) => res.sendFile('index.html', {root: path.resolve('public')}))
  .options((req, res) => {
    res.sendStatus(200);
  });

// bookingRouter
//   .route('/api/:roomid/bookings')
//   .get((req, res, next) => {
//     db.findOne(req.params.roomid)
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => {
//         console.log('there was an err in find one', err);
//         res.status(404).json(err);
//       });
//   }
//   );

module.exports = bookingRouter;


