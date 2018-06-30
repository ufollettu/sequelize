var express = require('express');
var router = express.Router();

var passport = require("passport");

var db = require('../models');

/* POST is now managed by auth/signup route. */
// router.post('/', async (req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
//   const body = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     username: req.body.username,
//     about: req.body.about,
//     email: req.body.email,
//     password: req.body.password,
//     last_login: new Date(),
//     status: req.body.status
//   };
  
//   db.user.create(body)
//     .then(() => {
//     res.send('utente creato');
//   })
//     .catch(err => res.send(err.errors));
// })

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  db.user.findAll()
    .then(users => {
      res.json(users)
    }).catch(err => res.send(err.errors));
});

module.exports = router;
