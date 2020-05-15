import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import 'default-passive-events'


Vue.use(ElementUI);
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://lzypc.xiaomiqiu.com'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
