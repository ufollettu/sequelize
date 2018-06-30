const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

const db = require('../models');

//Create a passport middleware to handle user registration
passport.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, async (req, username, password, next) => {
    db.user.findOne({
        where: {
            username: username
        }
    })
        .then(user => {
            if (user) {
                return next(null, false, {
                    message: 'That username is already taken'
                });
            } else {
                const body = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: username,
                    about: req.body.about,
                    email: req.body.email,
                    password: password,
                    last_login: new Date(),
                    status: req.body.status
                };
                //Save the information provided by the user to the the database
                return db.user.create(body)
                    .then(user => {
                        user ? next(null, user) : next(null, false);
                    }).catch(err => next(err));
            }
        })
}));

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, async (req, username, password, next) => {
    const isValidPassword = (userpass, password) => {
        return bcrypt.compare(password, userpass);
    }
    return db.user.findOne({ where: { username: username } })
        .then(user => {
            if (!user) {
                return next(null, false, { message: 'User not found' });
            }
            if (!isValidPassword(user.password, password)) {
                return next(null, false, { message: 'Wrong Password' });
            }
            // Send the user information to the next middleware
            return next(null, user, { message: 'Logged In Successfully' });
        })
        .catch(err => next(err));
}));

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    console.log('payload received', jwt_payload);
    return user = db.user.findById(jwt_payload)
        .then(user => {
            user ? next(null, user) : next(null, false);
        }).catch(err => next(err));
}));

