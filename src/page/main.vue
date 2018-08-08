<template>
  <div class="wrap_body">
      <top-nav></top-nav>
      <left-nav></left-nav>
      <div class="view_wrap">
          <router-view></router-view>
      </div>
  </div>
</template>
<script>
import leftNav from '../components/leftNav.vue'
import topNav from '../components/topNav.vue'

export default {
  data() {
    return {}
  },
  components: {
    leftNav,
    topNav
  }
}
</script>
<style lang="less">
  .wrap_body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .view_wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 200px;
      top: 50px;
      padding: 20px;
      box-sizing: border-box;
    }
  }
</style>
