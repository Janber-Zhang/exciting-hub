var config = require('../config/config.json');
var	mongoose = require('mongoose');
var	db = mongoose.connect(config.mongodb);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + db);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
	account: { type: String, unique : true},
	nickname : { type: String , default : ''},
	password: { type: String , required : true }
});

const UserModel = db.model('excited', UserSchema);

module.exports = {
	UserModel
};