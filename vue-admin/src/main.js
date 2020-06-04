import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element Ui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//使用elementUi
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
