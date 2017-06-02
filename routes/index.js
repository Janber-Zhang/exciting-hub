var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('web/homePage/index', { 
  	layout: '../public/web/layout.ejs',
  	title: 'Express' 
  });
});
router.get('/login', function(req, res, next) {
  res.render('web/login/login', { 
  	layout: '../public/web/layout.ejs',
  	title: 'Express' 
  });
});

module.exports = router;
