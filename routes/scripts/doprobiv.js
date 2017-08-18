var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('scripts/doprobiv', {
    title: 'Допробив'
  });
});

router.post('/', function(req, res) {
  req.checkBody('left','В левое поле не вставлена база для проверки!').notEmpty();
  req.checkBody('right','В правое поле не вставлены пробитые сайты!').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    res.render('scripts/doprobiv',{
      errors: errors,
      title:"Ошибка заполнения!",
      form: req.body
    });
  } else {
    var resultstr = '';
    var patt = /(https?:\/\/)?[a-zA-Z0-9\.\-]+\/?/;
    var patt2 = /https?:\/\/[^\/]+/;
    var leftarr = req.body.left
      .split("\r\n")
      .filter(function(x) {
        return patt.test(x)
      })
      .map(function(x) {
        if(x.substring(0,4)!='http') x = 'http://' + x;
        if(x.substring(0,5)==='https') x = x.replace("https://", 'http://');
        if(x.substring(7,11)==='www.') x = x.replace("http://www.", 'http://');
        console.log(patt2.exec(x)[0]);
        return patt2.exec(x)[0]
      })
      
    var rightarr = req.body.right
      .split("\r\n")
      .filter(function(x) {
        return patt2.test(x)
      })
      .map(function(x) {
        if(x.substring(0,5)==='https') x = x.replace("https://", 'http://');
        if(x.substring(7,11)==='www.') x = x.replace("http://www.", 'http://');
        return patt2.exec(x)[0]
      })
    console.log('======');
    console.log(leftarr.length);
    console.log('======');
    console.log(rightarr.length);
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };
    
    resultarr = leftarr.diff(rightarr);
    console.log('======');
    console.log(resultarr.length);
    var result = resultarr.join("\r\n");
    
    req.flash('info','Задача успешно обработана!');
    res.render('scripts/result-one-col',{
      title:"Сайты на допробив отобраны!",
      result: result
    });
  }

});


module.exports = router;
