var util = {
	queryData: function(type,param,cb){        //封装数据请求方法
		var questUrl = param.serviceUrl;
		delete param.serviceUrl;
		if (type === 'get') {
			if (Object.keys(param).length){
				questUrl +=  + '?';
				for (var key in param) {
					questUrl += key + '=' +param[key]
				}
			}
			var promise_ =  axios.get(questUrl).then((res) => {
				if (cb) {
					cb(res.data)
				}
			});
			return promise_
		}
		if (type === 'post') {
			var promise_ =  axios.post(questUrl, param).then((res) => {
				if (cb) {
					cb(res.data)
				}
			});
			return promise_
		}
	},
	logout: function() {						//登出
		let param = {
			httpType      :    'post',
			serviceUrl    :    'users/user/logout',
			apiModule     :    'newAPI'
		}
		var queryUserInfo = util.ajaxQuery(param, (res)=>{
			location.href = '/login';
		});
	},
	ajaxQuery: function (param,cb){
		var promise_ =  axios.post('/query/queryData', param).then((res) => {
			if (res.data.errno === 1111) {
				debugger
				location.href = '/login';
			}
			if (cb) {
				cb(res.data)
			}
		});
		return promise_
	}

}