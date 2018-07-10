	// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint);
import './assets/css/style.css'
Vue.config.productionTip = false
/* eslint-disable no-new */
//new Vue({
//	el: '#app',
//	router,
//	components: {
//		App
//	},
//	template: '<App/>'
//})
new Vue({
	//el: '#app',
	//template: '<App/>',
	router,
	//components: { App }
	render: h => h(App)
}).$mount('#app')