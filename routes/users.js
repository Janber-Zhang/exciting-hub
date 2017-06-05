var express = require('express');
var router = express.Router();
var UserModel = require('../model/Model').UserModel;

//登录
router.post('/signin.excited', (req, res, next) => {
    UserModel
        .findOne({
            password:req.body.password
        })
        .where('account',req.body.account)
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

//注册
router.post('/signup.excited', (req, res, next) => {
    let user ={
        nickname:req.body.nickname,
        password:req.body.password,
        account:req.body.account
    };
    console.log(user)
    UserModel
        .create(user)
        .then((data) => {
            if(data._id){
                delete data.password;
                req.session.user=data;
                res.send({
                    result:'true',
                    data:data
                })
            }else {
                res.send({
                    result:'false',
                    data:{errMsg:data},
                    errCode:1
                });
            }
        })
});

//检查是否存在
router.get('/checkAccountExist.excited', (req, res, next) => {
    UserModel
        .findOne({account:req.query.account})
        .exec((err,data) => {
            if (data !== null) {
                delete data.password
            }
            res.send({
                result:'true',
                data:data
            })
        })
});

module.exports = router;
