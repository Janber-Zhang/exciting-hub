const mutations = {
	initUserInfo (state,data) {
		state.userInfo = data;
	},
	initReadyState (state,data) {
		state.readyState = data;
	},
	initSmartApp (state,data) {
		state.smart_app = data;
	}
};

export default mutations