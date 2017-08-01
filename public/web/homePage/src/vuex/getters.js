const getters = {
	getUserInfo: (state)=>state.userInfo,
	getReadyState: (state)=>{
		return state.readyState
	},
	getSmartApp: (state)=>state.smart_app.name
};

export default getters