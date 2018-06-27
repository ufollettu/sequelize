var express = require('express');
var router = express.Router();

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var db = require('../models');

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    //   var user = users[_.findIndex(users, {id: jwt_payload.id})];
    return user = db.user.findOne({
        where: {
            username: jwt_payload.username,
            password: jwt_payload.password
        }
    }).then(user => {
        // user ? next(null, user) : next(null, false);
        if (user) {
            next(null, user)
        } else {
            next(null, false);
        }
    }).catch(err => console.log(err));
});

passport.use(strategy);
// app.use(passport.initialize());

// var Article = require('../models/article');

router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const body = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    about: req.body.about,
    email: req.body.email,
    password: req.body.password,
    last_login: new Date(),
    status: req.body.status
  };
  
  db.user.create(body)
    .then(() => {
    res.send('utente creato');
  })
    .catch(err => res.send(err.errors));
})

/* GET articles listing. */
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  db.user.findAll()
    .then(users => {
      res.json(users)
    }).catch(err => res.send(err.errors));
  // res.send('articles route');
});

module.exports = router;
