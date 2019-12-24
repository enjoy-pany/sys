<template>
  <div class="wrap_body">
    <top-nav></top-nav>
    <div class="view_wrap">
        <left-nav></left-nav>
        <div class="view_main">
          <level-bar></level-bar>
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
import leftNav from '@/components/LeftNav.vue'
import topNav from '@/components/TopNav.vue'
import levelBar from '@/components/LevelBar.vue'

export default {
  data() {
    return {}
  },
  components: {
    leftNav,
    topNav,
    levelBar
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
        flex-direction: column;
        width: 100%;
      }
    }
  }
</style>
