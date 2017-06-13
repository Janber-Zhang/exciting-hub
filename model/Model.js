var config = require('../config/config.json');
var	mongoose = require('mongoose');
var	db = mongoose.connect(config.mongodb);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + config.mongodb);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
	account		: { type: String, unique : true},
	nickname 	: { type: String , default : ''},
	sex 		: { type: String , default : 'unknown'},
	avatar 		: { type: Array , default : []},
	introduction: { type: String , default : ''},
	password	: { type: String , required : true }
});

const UserModel = db.model('users', UserSchema);

module.exports = {
	UserModel
};