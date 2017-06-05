var express = require('express');
var router = express.Router();
var checkLogin = require('./middleware.js').checkLogin;

/* GET home page. */
router.get('/', checkLogin, function(req, res, next) {
  res.render('web/homePage/index', { 
  	layout: '../public/web/layout.ejs',
  	title: 'index',
  	user: req.session.user
  });
});
router.get('/login', function(req, res, next) {
  res.render('web/login/login', { 
  	layout: '../public/web/layout.ejs',
  	title: 'login' 
  });
});

module.exports = router;
