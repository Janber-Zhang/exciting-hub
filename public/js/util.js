var util = {
	ajaxQuery: function (param,cb){
		var promise_ =  axios.post('/query/queryData', param).then((res) => {
			if (res.data.errno == 1111) {
				location.href = '/login';
				return
			}
			if (cb) {
				cb(res.data)
			}
		});
		return promise_
	},
	logout: function() {						//登出
		let param = {
			httpType      :    'post',
			serviceUrl    :    'user/logout'
		}
		var queryUserInfo = util.ajaxQuery(param, (res)=>{
			location.href = '/login';
		});
	}
}