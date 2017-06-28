var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var config = require('../config/config.json');

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
            res.send(res_.data);
        })
        .catch(function(err){
            console.log(err);
        });
    }
});

module.exports = router;
