var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
const url = 'mongodb://usesa:asdqwe1987234@ds145223.mlab.com:45223/ashipka';
const db = require('monk')(url);
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res) {
  if(req.isAuthenticated()){
    setTimeout(function() {
      req.flash('success','Добро пожаловать домой!');
      res.location('/admin');
      res.redirect('/admin');
    }, 3500);
  } else {
    res.render('admin/index-off', { 
      "title": "Представься, Вершитель!"
    });  
  }
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    // console.log('LocalStrategy');
    var users = db.get('users');
    // console.log('password -> '+password);
    users.findOne({name: username}, function(err,user){
      // console.log(user);
      if (err) {
        console.log('err:');
        console.log(err);
        return done(err); }
      if (!user) return done(null, false);
      if(bcrypt.compareSync(password, user.password)) return done(null, user);
      else return done(null, false);
    });
  }
));

router.post('/',
  passport.authenticate('local', {failureRedirect: 'http://hotelpics.ru/gei-zhest-porno-onlain/'}),
  function(req, res) {
    res.redirect('/login');
});

module.exports = router;
