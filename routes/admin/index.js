var express = require('express');
var router = express.Router();
const url = 'mongodb://usesa:asdqwe1987234@ds145223.mlab.com:45223/ashipka';
const db = require('monk')(url);
const Logs = db.get('logs');
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

module.exports = router;
