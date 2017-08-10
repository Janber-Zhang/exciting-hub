var util = {
	ajaxQuery: function (param,cb) {           //通用请求
		$('#loading').show();
		var promise_ =  axios.post('/query/queryData', param).then((res) => {
			$('#loading').hide();
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
		var param = {
			httpType      :    'post',
			serviceUrl    :    'user/logout'
		}
		var queryUserInfo = util.ajaxQuery(param, (res)=>{
			location.href = '/login';
		});
	},

	getRandom: function(min, max, count, diff) {  //max:最大值 min:最小值 count:生成个数 diff:是否互异
		count = count || 1;
		var number_arr = [];
		if (min >= max || (diff && count > (max-min+1))) {
			return 'Parameter Error'
		}
		var Range = max - min;
		for (var i = 1;;i++) {
			var Rand = Math.random();
			var num = min + Math.round(Rand * Range); //四舍五入
			if (!diff || number_arr.indexOf(num)==-1) {
				number_arr.push(num);
			}
			if (number_arr.length == count) {
				break
			}
		}
		return number_arr
	},

	arrayFlat: function(arr) {          //数组扁平化处理
		var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // 如果是数组，调用(递归)steamroller 将其扁平化
            // 然后再 push 到 newArr 中
            newArr.push.apply(newArr, this.arrayFlat(arr[i]));
        } else {
            // 不是数组直接 push 到 newArr 中
            newArr.push(arr[i]);
        }
    }
    return newArr;
	}
}