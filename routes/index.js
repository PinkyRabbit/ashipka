var express = require('express');
var router = express.Router();
const url = 'mongodb://usesa:asdqwe1987234@ds145223.mlab.com:45223/ashipka';
const db = require('monk')(url);
const ideas = db.get('ideas');
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
  ideas.find({},{sort: {date: -1}}, function(err, posts) {
    if(err) console.log(err);
    res.render('index', {
      title: 'Главная',
      ideas: posts
    });
  })
});

router.post('/', function(req, res) {
  if(req.body.name<3||req.body.name>50||req.body.idea<10||req.body.idea>5000){
    res.redirect('/');
  }else{
    ideas.insert({
      "owner": req.body.name,
      "date": moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a'),
      "idea": req.body.idea,
      "done": false,
    }, function(err, idea){
      if(err){
        console.log('ERROR', err);
        res.send(err);
      } else {
        req.flash('success','Статья была успешно добавлена!');
        // res.location('/');
        res.redirect('/');
      }
    });
  }
});

module.exports = router;
