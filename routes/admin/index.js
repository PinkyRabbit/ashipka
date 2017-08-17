var express = require('express');
var router = express.Router();
const url = 'mongodb://usesa:asdqwe1987234@ds145223.mlab.com:45223/ashipka';
const db = require('monk')(url);
const Logs = db.get('logs');
const Ideas = db.get('ideas');
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
  Logs.find({},{sort: {date: -1}}, function(err, logs) {
    if(err) console.log(err);
    res.render('admin/index', {
      title: 'Главная админки',
      logs: logs
    });
  })
});

router.delete('/idea/del/:id', function(req, res) {  
  Ideas.findOneAndDelete({'_id':req.params.id },function(err, idea){
    if(err) console.log(err);
    else {
      Logs.insert({
          "date": Date.now(),
          "event": 'Идея от <strong>'+String(idea.owner)+'</strong> была удалена',
          "color": 'danger'
        }, function(err, log) {
          if(err) console.log(err);
          req.flash('success', 'Идея от <strong>'+String(idea.owner)+'</strong> успешно удалёна!');
          res.location('/');
          res.redirect('/');
        });
    } // if err
  }); // adminTags
});

router.get('/idea/up/:id', function(req, res) {  
  Ideas.findOneAndUpdate({'_id':req.params.id },{
      $set: {
        "done": true
      }
    },
    function(err, idea){
    if(err) console.log(err);
    else {
      Logs.insert({
          "date": Date.now(),
          "event": 'Идея от <strong>'+String(idea.owner)+'</strong> был реализована',
          "color": 'info'
        }, function(err, log) {
          if(err) console.log(err);
          req.flash('success', 'Идея от <strong>'+String(idea.owner)+'</strong> успешно реализована!');
          res.location('/');
          res.redirect('/');
        });
    } // if err
  }); // adminTags
});


module.exports = router;
