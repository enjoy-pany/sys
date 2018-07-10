import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import viewWrap from '@/page/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'viewWrap',
      component: viewWrap
    }
  ]
})
