const mutations = {
	initUserInfo (state,data) {
		state.userInfo = data;
	},
	initReadyState (state,data) {
		state.readyState = data;
	}
};

export default mutations