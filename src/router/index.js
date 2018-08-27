import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import viewWrap from '@/page/main'
import orderList from '@/page/orderCenter/orderList'
import imgList from '@/page/otherCenter/imageList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'viewWrap',
      component: viewWrap
    },
    {
      path: '/ordercenter',
      name: 'orderCenter',
      component: viewWrap,
      children: [
        {
          path: 'orderlist',
          name: "orderList",
          component: orderList
        },
        {
          path: 'imagelist',
          name: 'imageList',
          component: imgList,
        }
      ]
    }
  ]
})
