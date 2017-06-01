var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('web/index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('web/login', { title: 'Express' });
});

module.exports = router;
