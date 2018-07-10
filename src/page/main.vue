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

</style>
