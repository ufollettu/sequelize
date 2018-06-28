const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

const db = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, cb) => {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    return db.user.findOne({
        where: {
            username: username,
            password: password
        }
    })
        .then(user => {
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
            return cb(null, user, { message: 'Logged In Successfully' });
        })
        .catch(err => cb(err));
}));

passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    console.log('payload received', jwt_payload);
    return user = db.user.findById(jwt_payload)
        .then(user => {
            user ? next(null, user) : next(null, false);
        }).catch(err => console.log(err));
}));

