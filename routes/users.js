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

//注销
router.get('/signout.excited', (req, res, next) => {
    req.session.user=null;
    res.send({
        result:'true'
    })
});

//注册
router.post('/signup.excited', (req, res, next) => {
    let user ={
        nickname:req.body.nickname,
        password:req.body.password,
        account:req.body.account
    };
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

//获取用户信息
router.get('/getUserInfo.excited', (req, res, next) => {
    let user = req.session.user;
    if (user.password) {
        delete user.password
    }
    res.send({
        result:'true',
        data: user
    })
});

module.exports = router;
