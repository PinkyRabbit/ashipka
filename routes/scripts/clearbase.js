var express = require('express');
var router = express.Router();
const synonymize = require('synonymize-api');

router.get('/', function(req, res) {
  res.render('scripts/clearbase', {
    title: 'Очистить базу от дублей'
  });
});

router.post('/', function(req, res) {
  req.checkBody('text','Хаха просто так нажали на красную кнопку!').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    res.render('scripts/sinonimize',{
      errors: errors,
      title:"Шутки шутить изволите =))))"
    });
  } else {
    var patt = /(https?:\/\/)?[a-zA-Z0-9\.\-]+\/?/;
    var patt2 = /https?:\/\/[^\/]+/;
    var domainsArr = req.body.text
      .split("\r\n")
      .filter(function(x) {
        return patt.test(x)
      })
      .map(function(x) {
        if(x.substring(0,4)!='http') x = 'http://' + x;
        if(x.substring(0,5)==='https') x = x.replace("https://", 'http://');
        if(x.substring(7,11)==='www.') x = x.replace("http://www.", 'http://');
        // console.log(patt2.exec(x)[0]);
        return patt2.exec(x)[0]
      })
      
    uniqueArray = domainsArr.filter(function(item, pos) {
      return domainsArr.indexOf(item) == pos;
    })
    
    req.flash('info','Задача успешно обработана!');
    res.render('scripts/result-one-col',{
      title:"Сайты на допробив отобраны!",
      result: uniqueArray.join("\r\n")
    });  
  }
});


module.exports = router;
