import axios from 'axios'; // 主要AJAX套件
import VueAxios from 'vue-axios'; // 將它轉為 VUe的套件
import Loading from 'vue-loading-overlay'; // 增加使用者體驗 - 讀取中效果製作
import 'vue-loading-overlay/dist/vue-loading.css'; // 增加使用者體驗 - 讀取中效果製
import 'bootstrap';

// 建立訂單，驗證是否輸入表單
import {
  ValidationProvider, ValidationObserver, extend, localize,
} from 'vee-validate';
// 本地化
// import { localize } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json';
// email 規則驗證
import { required, email } from 'vee-validate/dist/rules';

import Vue from 'vue';
import App from './App.vue';
import router from './router';

import currencyFilter from './Filters/currency'; // 千分號
import dateFilter from './Filters/date'; // 日期轉換

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
// 登入 API 補充說明 (跨域)
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading); // 增加使用者體驗 - 讀取中效果製作

Vue.component('Loading', Loading); // 增加使用者體驗 - 讀取中效果製作
Vue.filter('currency', currencyFilter); // 千分號。 參數:1.自訂名稱 2.import的名稱
Vue.filter('date', dateFilter); // 日期轉換。 參數:1.自訂名稱 2.import的名稱

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// next: Function: 到達下一個頁面
router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  // 如果要去的頁面有requiresAuth 就不直接放行
  // 執行確認登入API
  if (to.meta.requiresAuth) {
    // console.log('這裡需要驗證');
    // 驗證登入 API
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    // 改直接使用axios
    axios.post(api).then((response) => {
    // console.log(response.data);
    // 如果持續登入驗證成功 就直接通行
      if (response.data.success) {
        next();
        // console.log('驗證已登入');
      } else { // 否就回到登入的頁面
        next({
          path: '/login',
        });
        // console.log('未登入');
      }
    });
  } else { // 否的話就直接放行
    next();
  }
});

// --------------vee-validate------------------------
// https://hao1229.github.io/2019/08/09/EcommercePractice8/

localize('zh_TW', TW);
// Add a rule，此範例中添加了一個名為'secret'的規則，若 value 值不為 'example'，就會回饋 message 裡的文字。
extend('min', {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ['length'],
  message: '長度不夠',
});
// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('email', email);
extend('required', { // 這邊可以改寫我們 email 告知使用者是必填欄位的提示文字
  ...required,
  message: '必填',
});
extend('required2', { // 這邊可以改寫我們 email 告知使用者是必填欄位的提示文字
  ...required,
  message: '選填',
});
// --------------vee-validate------------------------
