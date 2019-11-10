import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';

import 'ant-design-vue/dist/antd.css';
import './style.css';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueAxios, axios);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
