const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
secretOrKey = 'tasmanianDevil';

var db = require('../models');

router.get('/', async (req, res, next) => {
    res.render('signin');
});

router.post('/', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user.id, secretOrKey);
           return res.json({user, token});
        });
    })(req, res);


    // if (req.body.username && req.body.password) {
    //     var username = req.body.username;
    //     var password = req.body.password;
    // }
    // return db.user.findOne({
    //     where: {
    //         username: username,
    //         password: password
    //     }
    // }).then(user => {
    //     if (!user) {
    //         res.status(401).json({ message: "no such user found" });
    //     }
    //     if (user.password === req.body.password) {
    //         // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    //         var payload = { id: user.id };
    //         var token = jwt.sign(payload, secretOrKey);
    //         res.json({ message: "ok", token: token });
    //     } else {
    //         res.status(401).json({ message: "passwords did not match" });
    //     }
    // }).catch(err => console.log(err));
    
})

module.exports = router;