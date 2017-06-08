var express = require('express');
var router = express.Router();
var path = require('path');

formidable = require('express-formidable')({
    uploadDir : path.join(__dirname,'../public/uploadFiles'),
    keepExtensions : true
});

//上传
router.post('/',formidable, (req, res, next) => {
    let url = '/'+req.files.file.path.split('/public/')[1];
    res.send({
        result:'true',
        data:{
            url:url,
            name:req.files.file.name
        }
    })
});

module.exports = router;
