import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router'
//引入elementui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入重置样式
import 'normalize.css'
//引入自己设置的公用样式
import '@/assets/styles/common.css'

//引入axios模块
import axios from 'axios'
Vue.prototype.$axios = axios;




Vue.config.productionTip = false
Vue.use(ElementUI);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
