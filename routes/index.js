var express = require('express');
var router = express.Router();

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


router.get('/test', function(req, res, next) {
	res.render('web/test/index', {
		title: 'test'
	})
});

module.exports = router;
