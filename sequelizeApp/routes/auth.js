const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
secretOrKey = 'tasmanianDevil';

const authController = require('../controllers/auth.server.controller');

router.get('/signin', authController.signin);

router.post('/signin', async (req, res, next) => {
    passport.authenticate('login', { session: false }, async (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }
        req.login(user, { session: false }, async (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.id, secretOrKey);
            return res.json({ user, token });
        });
    })(req, res, next);
})

router.get('/signup', authController.signup);

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

router.post('/logout'), async () => {
    // we need to destroy token in client end
}

module.exports = router;