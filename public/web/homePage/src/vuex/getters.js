const getters = {
	getUserInfo: (state)=>state.userInfo,
	getReadyState: (state)=>{
		console.log(state.readyState)
		return state.readyState
	}
};

export default getters