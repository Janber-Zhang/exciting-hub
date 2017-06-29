const actions = {
	initUserInfo (context){
		let param = {
			httpType      :    'get',
			serviceUrl    :    'users/user/getuserinfo',
			apiModule     :    'newAPI'
		}
		var queryUserInfo = util.ajaxQuery(param, (res)=>{
			let default_info = {
				nickname: '测试',
				avatar: [],
				sex: 'unknown',
				introduction: '这个人很懒，什么也没写...'
			} 
			var userInfo = $.extend({}, default_info, res.data);
			context.commit('initUserInfo',userInfo);
			context.commit('initReadyState',true);
		});
	}
}

export default actions