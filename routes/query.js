var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var config = require('../config/config.json');

function checkSession(serviceUrl,session){
  if (config.apiWhitelist.indexOf(serviceUrl) == -1 && !session.user) {
    return false;
  } else {
    return true;
  }
};

function canSetSession(serviceUrl){
  var routerList = ["users/user/add", "users/user/login"];
  var result = false;
  for (var i = 0, len = routerList.length; i < len; i++) {
    var item = routerList[i];
    if (serviceUrl.indexOf(item) > -1){
      result = true;
    }
  }
  return result;
}

router.post('/queryData', (req, res, next) => {
  var params = req.body;
  if (!('httpType' in params)) {
    params.httpType = 'get';
  }
  if (!('serviceUrl' in params)) {
    //参数错误
    res.send('{"refresh":1}');
    return;
  }
  
  var serviceUrl = params.serviceUrl;
  var httpType = params.httpType;
  delete params["serviceUrl"];
  delete params["httpType"];
  var apiUrl = config.queryAPI;
  if (params.apiModule && params.apiModule == 'newAPI') {
    apiUrl = config.newAPI;
    delete params["apiModule"];
  }
  if (!checkSession(serviceUrl,req.session)) {        //判断登录状态
    res.send({errno: '1111', errmsg: 'need login'});
    return
  }
  if (req.session.user) {
    params.current_user_id = req.session.user._id;
  }
  var serviceUrl = apiUrl + '/' + serviceUrl;
  if (httpType == 'get') {
    if (Object.keys(params).length){
      serviceUrl += '?';
      for (var key in params) {
        serviceUrl += key + '=' +params[key];
      }
    }
    axios.get(serviceUrl)
    .then((res_) => {
      res.send(res_.data);
    })
    .catch(function(err){
      console.log(err);
    });
  }
  if (httpType == 'post') {
      axios.post(serviceUrl, params).then((res_) => {
        if(canSetSession(serviceUrl)) {               //登录或注册成功后写入session
          req.session.user = res_.data.data.user;
        }
        res.send(res_.data);
      })
      .catch(function(err){
        console.log(err);
      });
  }
});

module.exports = router;
