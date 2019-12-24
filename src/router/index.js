import Vue from 'vue'
import Router from 'vue-router'

import menus from '../store/menu/index.js';

Vue.use(Router)

export default new Router({
  routes: menus.state.menuData
})
