import Vue        from 'vue';
import Vuex       from 'vuex';
import getters     from './getters';
import mutations  from './mutations';
import actions     from './actions';

Vue.use(Vuex);

const state = {
	userInfo:{asd:'asd'},
	data:{},
	chat: {
		roomId: 'default',
		msgArr: []
	},
	smart_app:{
		name: ''
	},
	readyState: false
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})