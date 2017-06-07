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


iView.LoadingBar.config({              //iview loading
	color: '#3e76f6',
	failedColor: '#e96900',
	height: 2
});
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});

const app = new Vue({
  router,
  store
}).$mount('#app')