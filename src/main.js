import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 局部引入element-ui 组件
// import { Button, Row } from 'element-ui';
// Vue.component(Button.name, Button);
// Vue.component(Row.name, Row);


// 全局引入element-ui组件 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 导入路由
import router from '@/router'



// 导入数据仓库 store
import store from '@/store'

// 导入mock 模拟数据
import '@/api/mock'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
