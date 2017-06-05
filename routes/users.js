var express = require('express');
var router = express.Router();
var UserModel = require('../model/Model').UserModel;

//登录
router.post('/signin.excited', (req, res, next) => {
    UserModel
        .findOne({
            password:req.body.password
        })
        .where('name',req.body.account)
        .exec((err,data) => {
            if(data){
                delete data.password;
                req.session.user=data;
                res.send({
                    result:'true'
                });
            }else{
                res.send({
                    result:'false'
                });
            }
        })
});

module.exports = router;
