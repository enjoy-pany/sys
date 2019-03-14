<template>
  <div class="wrap_body">
    <top-nav></top-nav>
    <left-nav></left-nav>
    <div class="view_wrap">
        <levelbar></levelbar>
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
import leftNav from '../components/leftNav.vue'
import topNav from '../components/topNav.vue'
import levelbar from '@/components/levelbar'

export default {
  data() {
    return {}
  },
  components: {
    leftNav,
    topNav,
    levelbar
  }
}
</script>
<style lang="less">
  @import '../assets/less/pub.less';
  .wrap_body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .view_wrap {
      width: ~"calc(100% - 200px)";
      height: 100%;
      position: absolute;
      left: 200px;
      top: 50px;
      padding: 20px;
      box-sizing: border-box;
    }
  }
</style>
