const actions = {
	initUserInfo (context){
		let param = {
			httpType      :    'get',
			serviceUrl    :    'users/user/getuserinfo',
			apiModule     :    'newAPI'
		}
		let queryUserInfo = util.ajaxQuery(param, (res)=>{
			let default_info = {
				nickname     : '测试',
				avatar       : [],
				sex          : 'unknown',
				introduction : '这个人很懒，什么也没写...',
				birthday     : ''
			}
			let userInfo = $.extend({}, default_info, res.data.user);
			context.commit('initUserInfo',userInfo);
			context.commit('initReadyState',true);
		});
	},
	initSmartApp (context,data) {
		let smart_app = {
			name: data
		}
		context.commit('initSmartApp',smart_app)
	}
}

export default actions