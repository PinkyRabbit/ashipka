var express = require('express');
var router = express.Router();

var folder = __dirname+'/../../public/uploads/';
var fs = require('fs');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('cb = '+__dirname + folder);
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, 'delit')
  }
});
var upload = multer({ storage: storage });


router.get('/', function(req, res, next) {
  res.render('scripts/avtozamena', {
    title: 'Автозамена'
  });
});

router.post('/', upload.single('myfile'), function(req, res) {
  req.checkBody('search','Забыли ввести что ищем!').notEmpty();
  req.checkBody('right','Вы забыли указать на что заменять').notEmpty();
  var text = '';
  if(req.file){
    // console.log('__dirname = '+__dirname);
    // console.log('folder = '+folder);
    var filename = folder+'delit';
    // console.log('filename = '+filename);
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) {
        res.redirect('back')
      }
      text = data;
      fs.unlink(filename, function(err, result) {
        if(err) res.redirect('back')
      });
    })
  }else{
    req.checkBody('text','А где текст? Потеряли!').notEmpty();
    text = req.body.text;
  }
  
  var errors = req.validationErrors();
  if(errors){
    res.render('scripts/avtozamena',{
      errors: errors,
      title:"Ошибка заполнения!",
      form: req.body
    });
  } else {
    if(req.file){
      var cc = 0;
      setTimeout(function run() {
        cc += 1;
        if(text.length==0&&cc<1000) setTimeout(run, 500);
        else calc(text);
      }, 500);
    } else calc(text);
  }
  
  function calc(text) {
    var rightarr = req.body.right
      .split("\r\n")
      .filter(function(x) {
        return x.length>1;
      })
    escSearch = regexEscape(req.body.search);
    var regex = new RegExp(escSearch, "");
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
