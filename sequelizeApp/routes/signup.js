var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', async (req, res, next) => {
    res.render('signup');
});

router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}

));

module.exports = router;