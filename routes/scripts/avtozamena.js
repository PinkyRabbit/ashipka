var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('scripts/avtozamena', {
    title: 'Автозамена'
  });
});

router.post('/', function(req, res) {
  req.checkBody('search','Забыли ввести что ищем!').notEmpty();
  req.checkBody('text','А где текст? Потеряли!').notEmpty();
  req.checkBody('right','Вы забыли указать на что заменять').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    res.render('scripts/avtozamena',{
      errors: errors,
      title:"Ошибка заполнения!",
      form: req.body
    });
  } else {
    var rightarr = req.body.right
      .split("\r\n")
      .filter(function(x) {
        return x.length>1;
      })
    escSearch = regexEscape(req.body.search);
    var regex = new RegExp(escSearch, "");
    var text = req.body.text;
    index = 0;
    while(regex.test(text)){
      var text = text.replace(regex, rightarr[index]);
      index = index + 1;
      if(index === rightarr.length) index=0;
    }
    req.flash('info','Задача успешно обработана!');
    res.render('scripts/result-one-col',{
      title:"Сайты на допробив отобраны!",
      result: text
    });
  }

  function regexEscape(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
});


module.exports = router;
