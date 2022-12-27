import Vue from 'vue'
import App from './App'
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

// 提示的方法
uni.$showMsg = function(title='数据加载中...', duration=1000){
	  uni.showToast({
	  	title,
			duration,
			icon:'none'
	  })
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()


// // #ifdef VUE3
// import {
//   createSSRApp
// } from 'vue'
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// // #endif
