var express = require('express');
var router = express.Router();
var checkLogin = require('./middleware.js').checkLogin;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('web/homePage/index', {
  	layout: '../public/web/layout.ejs',
  	title: 'index'
  });
});
router.get('/login', function(req, res, next) {
  res.render('web/login/login', { 
  	title: 'login' 
  });
});

module.exports = router;
