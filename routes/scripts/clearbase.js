var express = require('express');
var router = express.Router();
const synonymize = require('synonymize-api');

var folder = __dirname+'/../../public/uploads/';
var fs = require('fs');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, 'delit')
  }
});
var upload = multer({ storage: storage });

router.get('/', function(req, res) {
  res.render('scripts/clearbase', {
    title: 'Очистить базу от дублей'
  });
});

router.post('/', upload.single('myfile'), function(req, res) {
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
    res.render('scripts/clearbase',{
      errors: errors,
      title:"Шутки шутить изволите =))))"
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
    var patt = /(https?:\/\/)?[a-zA-Z0-9\.\-]+\/?/;
    var patt2 = /https?:\/\/[^\/]+/;
    var domainsArr = text
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
