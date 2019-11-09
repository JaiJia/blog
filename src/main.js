import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';

import 'ant-design-vue/dist/antd.css';
import './style.css';

Vue.config.productionTip = false;
window.authArr = ['dff2a6d31d5e14e0b1830' + '255583a807c0b64b7e3'];

Vue.use(Antd);
Vue.use(VueAxios, axios);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
