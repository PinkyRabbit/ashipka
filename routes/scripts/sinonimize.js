var express = require('express');
var router = express.Router();
const synonymize = require('synonymize-api');

router.get('/', function(req, res) {
  res.render('scripts/sinonimize', {
    title: 'Синонимайзер'
  });
});

router.get('/word/:word', function(req, res) {
  // console.log('==>'+req.params.word+'<==');
  synonymize(req.params.word).then(response => {
    // console.log('response = '+ response);
    res.send(response.join('|'));
    // console.log(response); // => [ 'автомобиль', 'аппарат', 'спорткар', 'more 20 items...' ]
    // console.log(response[2]); // => 'спорткар'
  }).catch(function(e){
    res.send(e);
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
    
    var text = req.body.text;
    var word = '';
    var isCap = false;
    var afterword = '';
    var result = '';
    
    word = /[А-Яа-я-]+/.exec(text)[0];
    text = text.substring(word.length);
    if(/[А-Я]/.test(word.charAt(0))) isCap = true;
    else isCap = false;
    word = word.toLowerCase();
    
    afterword = /[^А-Яа-я-]+/.exec(text)[0];
    text = text.substring(afterword.length);
    
    synonymize(word).then(response => {
      console.log('==>'+response+'<==');
      // console.log(response); // => [ 'автомобиль', 'аппарат', 'спорткар', 'more 20 items...' ]
      // console.log(response[2]); // => 'спорткар'
    });
    
    res.send('<p style="background:yellow">'+text+'</p>');
  }

});


module.exports = router;
