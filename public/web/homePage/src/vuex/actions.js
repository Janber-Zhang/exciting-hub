const actions = {
	initUserInfo (context){
		let param = {
			serviceUrl: '/user/getUserInfo.excited'
		}
		var queryUserInfo = util.queryData('get',param,(res)=>{
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