import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import './permission'; // 路由判断
// 全局注册
import common from './libs/common';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(common);
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
