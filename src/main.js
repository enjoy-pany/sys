// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//axios
// import axios from 'axios'
import { http } from './api/http.js'
console.log(http)
Vue.prototype.$http = http

//vue-codemirror
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/theme/base16-light.css'
Vue.use(VueCodemirror, { 
  options: { 
    theme: 'base16-light',
    tabSize: 4,
    mode: "htmlmixed",
    lineNumbers: true,
    line: true,
    readOnly: true
  },
  // events: ['scroll', ...]
})

require('@/mock')

Vue.config.productionTip = false

Vue.use(ElementUI)

//全局组件
import myCode from '@/components/Code.vue'
import subTitle from '@/components/SubTitle.vue'
Vue.component('myCode', myCode)
Vue.component('subTitle', subTitle)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
