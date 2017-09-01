var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');

var index = require('./routes/index');
var login = require('./routes/login');

var scripts_doprobiv = require('./routes/scripts/doprobiv');
var scripts_avtozamena = require('./routes/scripts/avtozamena');
var scripts_sinonimize = require('./routes/scripts/sinonimize');
var scripts_clearbase = require('./routes/scripts/clearbase');

var admin = require('./routes/admin');
var admin_users = require('./routes/admin/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'secret-ash1',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-Agent: *\nAllow: *.*");
});


app.use('*', function(req, res, next) { // TODO: edit this
  if(req.isAuthenticated()){
    res.locals.authxyz = true;
  } else {
    res.locals.authxyz = null;
  }
  next();
});
/* Authentication
=========================== */
app.use(['/admin/','/editpost/'],
  function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    else {
      res.locals.title = "Страницы не существует!";
      res.locals.description = "Страницы не существует! Нету её! Потерялась ваще и не было никогда!";
      var err = new Error('Такой страницы нет!');
      err.status = 404;
      next(err);
    }
});

app.use('/', index);
app.use('/login', login);

app.use('/scripts/doprobiv', scripts_doprobiv);
app.use('/scripts/avtozamena', scripts_avtozamena);
app.use('/scripts/sinonimize', scripts_sinonimize);
app.use('/scripts/clearbase', scripts_clearbase);


app.use('/admin', admin);
app.use('/admin/users', admin_users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
