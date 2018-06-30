const signup = async (req, res) => {
    res.render('signup');
}

module.exports.signup = signup;

const signin = async (req, res) => {
    res.render('signin');
}

module.exports.signin = signin;