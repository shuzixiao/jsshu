import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import mygarage from '@/components/mygarage'
import { serveraddress, yyctoken, yycrefreshtoken } from '../util/public'
Vue.use(Router)
const router = new Router({
	//	 mode: 'history',
	routes: [{
			path: '/',
			name: 'index',
			component: index,
			meta: {
				title: '强生易验车'
			}
		},
		//		{
		//			path: '/index',
		//			name: 'index',
		//			component: index,
		//			meta: {
		//				title: '强生易验车'
		//			}
		//		},
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: {
				title: '绑定手机号'
			}
		},
		{
			path: '/mygarage',
			name: 'mygarage',
			component: mygarage,
			meta: {
				title: '我的车库'
			}
		},
	]
})
router.beforeEach((to, from, next) => {
	if(to.meta.title) { //如果设置标题，拦截后设置标题
		document.title = to.meta.title
	}
	next()
})
export default router