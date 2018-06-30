var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var exphbs = require('express-handlebars');

var models = require('./models');

var authRouter = require('./routes/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// For Passport
// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

//load passport strategies
// require('./config/passport')(passport, models.user);
require('./config/passport');

// DB
models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database');
})
  .catch(err => {
    console.error('Unable to connect to SQL database:', err);
  });
if (config.database === 'sequelize_dev') {
  models.sequelize
    // .sync({ force: true }) //delete previous tables, good for testing
    .sync() //creates tables from models (do note update!)
    .then()
    .catch(err => console.log(err));
}

// CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Routes
app.use('/', indexRouter);

app.use('/auth', authRouter);

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
