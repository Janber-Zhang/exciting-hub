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
router.get('/chat/:roomID', function(req, res, next) {
  var roomID = req.params.roomID;
  // 渲染页面数据(见views/room.hbs)
  res.render('web/chat/chat', {
    roomID: roomID,
    users: ['123','456'],
    user: req.session.user
  });
});
router.get('/login', function(req, res, next) {
  res.render('web/login/login', { 
  	title: 'login' 
  });
});

module.exports = router;
