<template>
  <div class="wrap_body">
      <div class="loginWrap" v-if="true">
        <loginWrap></loginWrap>
      </div>
      <div class="mainCon" v-else>
        <top-nav></top-nav>
        <left-nav></left-nav>
        <div class="view_wrap">
            <levelbar></levelbar>
            <router-view></router-view>
        </div>
      </div>
  </div>
</template>
<script>
import leftNav from '../components/leftNav.vue'
import topNav from '../components/topNav.vue'
import levelbar from '@/components/levelbar'
import loginWrap from '@/page/userCenter/Login'

export default {
  data() {
    return {}
  },
  components: {
    leftNav,
    topNav,
    levelbar,
    loginWrap
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
    .loginWrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(at 35px 35px, #fff, #9ac4c9);
      background: -webkit-radial-gradient(at 35px 35px, #fff, #9ac4c9); /* Safari 5.1 - 6.0 */
      background: -o-radial-gradient( at 35px 35px, #fff, #9ac4c9); /* Opera 11.6 - 12.0 */
      background: -moz-radial-gradient( at 35px 35px, #fff, #9ac4c9); /* Firefox 3.6 - 15 */
    }
    .mianCon {
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
  }
</style>
