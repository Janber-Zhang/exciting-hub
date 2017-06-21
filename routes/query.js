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
    if (!('serviceName' in params) || !('functionName' in params)) {
        //参数错误
        res.send('{"refresh":1}');
        return;
    }
    var serviceName = params.serviceName;
    var functionName = params.functionName;
    var httpType = params.httpType;
    delete params["serviceName"];
    delete params["functionName"];
    delete params["httpType"];
    var serviceUrl = config.queryAPI + '/' + serviceName + '/' + functionName;
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
        axios.post(serviceUrl, param).then((res_) => {
            res.send(res_.data);
        })
        .catch(function(err){
            console.log(err);
        });
    }
});

module.exports = router;
