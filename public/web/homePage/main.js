/**
 * Created by janber on 17/3/20.
 */
import Vue          from 'vue';
import VueRouter    from 'vue-router';
import routes    	from './router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

const app = new Vue({
  router
}).$mount('#app')