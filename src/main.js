import Vue from 'vue'
import App from './App.vue'
import router from './router'
//在main.js引入lib-flexible
import 'lib-flexible/flexible'
//从vant导入组件
import { Button } from 'vant'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)


import { Toast } from 'vant';


import { Tabbar, TabbarItem } from 'vant';
import { NavBar } from 'vant';

import { Search } from 'vant';



import { Swipe, SwipeItem } from 'vant';

import { Loading } from 'vant';





import { Stepper } from 'vant';



import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';



import { Icon } from 'vant';


import { ShareSheet } from 'vant';


Vue.use(ShareSheet);



import { Form } from 'vant';
import { Field } from 'vant';


import { List } from 'vant';
import { SwipeCell } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant';
import { Empty } from 'vant';


import { Cell, CellGroup } from 'vant';


import { Popup } from 'vant';


import { AddressList } from 'vant';

import { AddressEdit } from 'vant';

import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(AddressEdit);


Vue.use(AddressList);


Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);




Vue.use(Empty);
Vue.use(SubmitBar)

Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.use(SwipeCell);


Vue.use(List);


Vue.use(Form);
Vue.use(Field);






Vue.use(Icon);


Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Stepper);
Vue.use(Loading);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast)
Vue.use(VueAxios, axios)

//全局注册Button组件
Vue.use(Button);


//设置Vue原型属性
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';

//axios拦截器，在发起请求之前执行
axios.interceptors.request.use(config => {

  //处理post请求参数, 进行参数序列化
  if (config.method == 'post') {

    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }

    //重新赋值config.data
    config.data = paramsString.slice(0, -1);
  }
  //必须返回config
  return config;
})



//定义全局过滤器
//保留小数
Vue.filter('decimal', (v, n = 2) => {
  return v.toFixed(n);
})

//格式化日期
Vue.filter('formatDate', (v, format) => {

  //创建日期对象
  let date = new Date(v);

  //格式化年份
  let year = date.getFullYear().toString();
  // 
  if (/(y+)/.test(format)) {
    //获取匹配组的内容
    var content = RegExp.$1;
    // 
    format = format.replace(content, year.slice(year.length - content.length));
  }

  //格式化月份、日份、时、分、秒
  let o = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
     
  };

  for (let key in o) {
    //创建动态正则表达式
    let reg = new RegExp(`(${key}+)`);
    // 

    if (reg.test(format)) {
      //获取组匹配的内容
      let groupContent = RegExp.$1;

      format = format.replace(groupContent, o[key] >= 10 ? o[key] : groupContent.length == 2 ? '0' + o[key] : o[key]);
      // 
    }
  }
  return format;
})



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
