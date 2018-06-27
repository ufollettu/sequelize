var express = require('express');
var router = express.Router();
// var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
// var JwtStrategy = passportJWT.Strategy;
var jwt = require('jsonwebtoken');
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

var db = require('../models');

router.get('/', async (req, res, next) => {
    res.render('signup');

});

router.post('/', function (req, res) {
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
    }
    // usually this would be a database call:
    // var user = users[_.findIndex(users, { name: name })];
    return user = db.user.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(user => {
        if (!user) {
            res.status(401).json({ message: "no such user found" });
        }
        if (user.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            var payload = { id: user.id };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ message: "ok", token: token });
        } else {
            res.status(401).json({ message: "passwords did not match" });
        }
    }).catch(err => console.log(err));
    
})

module.exports = router;