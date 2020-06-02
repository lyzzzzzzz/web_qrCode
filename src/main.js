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
  if (to.path !== '/login' && !isAuthenticated) next('/login')
  else next()
})
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

Date.prototype.format = function(format) {
	if (typeof format === "undefined") {
		console.error("請輸入需要的格式");
	} else {
		const date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (let k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
					date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	}
};
