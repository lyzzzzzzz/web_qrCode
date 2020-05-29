import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from '../src/route/route.js'
import { get, post, isAuthenticated } from '../src/services/ajax.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$get = get;
Vue.prototype.$post = post;
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path !== '/login' && !isAuthenticated) next('/login')
  else next()
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
