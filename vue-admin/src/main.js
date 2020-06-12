import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局配置菜单文件
import $conf from './common/config/config.js'
//把全局菜单挂载Vue的实例上面
Vue.prototype.$conf = $conf;
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
