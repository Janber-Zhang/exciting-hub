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
    
    UserModel
        .findById(user._id)
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
//编辑用户信息
router.post('/editUserInfo.excited', (req, res, next) => {
    let userInfo = JSON.parse(req.body.user),
        condiction = {_id: userInfo._id},
        query = {$set: 
            {
                nickname   : userInfo.nickname, 
                user_id    : userInfo._id,
                avatar     : userInfo.avatar,
                sex        : userInfo.sex,
                introduction:userInfo.introduction
            }
        };
    UserModel.update(condiction, query, (err, result)=>{
        console.log(err)
        console.log(result)
        if(err) {
            console.log(err)
            res.send({
                result:'true',
                msg: 'success'
            })
        }
        res.send({
            result:'true',
            msg: 'server error'
        })
    })
});

module.exports = router;
