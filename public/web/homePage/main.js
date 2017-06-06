/**
 * Created by janber on 17/3/20.
 */
import Vue          from 'vue';
import VueRouter    from 'vue-router';
import Vuex         from 'vuex';
import routes    	from './router';
import store    	from './src/vuex/index';
import iView        from 'iview' 
import './src/css/app.less';
import 'iview/dist/styles/iview.css';    // iView CSS


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

const app = new Vue({
  router,
  store
}).$mount('#app')