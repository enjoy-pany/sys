<template>
  <div class="wrap_body">
    <top-nav></top-nav>
    <div class="view_wrap">
        <left-nav></left-nav>
        <div class="view_main">
          <router-view></router-view>
        </div>
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
    topNav,
  }
}
</script>
<style lang="less">
  @import '../assets/less/pub.less';
  .wrap_body {
    width: 100%;
    height: 100%;
    background: #eff0f4;
    overflow: hidden;
    position: relative;
    .view_wrap {
      display: flex;
      width: 1280px;
      height: calc(~"100vh - 60px");
      margin: 20px auto 0;
      padding-bottom: 20px;
      .view_main {
        display: flex;
        width: 100%;
      }
    }
  }
</style>
