var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const url = 'mongodb://usesa:asdqwe1987234@ds145223.mlab.com:45223/ashipka';
const db = require('monk')(url);
var Logs = db.get('logs');
var Users = db.get('users');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('admin/users', { 
    title: 'Создать пользователя'
  });
});

router.post('/', function(req, res, next) {
  // console.log(req.body);
  var pass1 = req.body.pass1;
  var pass2 = req.body.pass2;
  req.checkBody('name','Имя обязательно для заполнения!').notEmpty();
  req.checkBody('email','Не знаете что такое электронная почта или просто опечатались?').isEmail();
  req.checkBody('pass1','Как это так, забыли написать пароль?! о_О').notEmpty();
  req.checkBody('pass2','Введённые пароли не совпадают').equals(pass1);
  var errors = req.validationErrors();  
  if(errors){
    res.render('admin/users', { 
      "errors": errors,
      "title": "Создать пользователя"
    });
  } else {
    var hash = bcrypt.hashSync(pass1, salt);
    Users.insert({
      name: req.body.name,
      email: req.body.email,
      password: hash
    }).then((docs) => {
      Logs.insert({
          "date": Date.now(),
          "event": 'Пользователь <strong>'+req.body.name+'</strong> успешно создан',
          "color": 'danger'
        }, function(){
          req.flash('success','Пользователь <strong>'+req.body.name+'</strong> был успешно создан!');
          res.location('/');
          res.redirect('/');
        });
      }).catch((err) => {
        throw err;
      }).then(() => db.close());
  }
});

router.get('/logout',function(req, res){
  req.logout();
  req.flash('info','Вы вышли из админки!');
  res.redirect('/');
});

module.exports = router;
