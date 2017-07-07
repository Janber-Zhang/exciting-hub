var express = require('express');
var router = express.Router();
// var UserModel = require('../model/Model').UserModel;

//注销
router.post('/logout', (req, res, next) => {
    req.session.user=null;
    res.send({
        result:'true'
    })
});

module.exports = router;
