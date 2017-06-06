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
		var logout = this.queryData('get',{serviceUrl:'/user/signout.excited'});
		logout.then(()=>{
			location.href = '/login';
		});
	}

}