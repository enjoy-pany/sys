<template>
  <div class="navBar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in menusList"
        :to="{ path: item.path }"
        :key="item.name"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  computed: {
   menusList(){
      return this.$route.matched.slice(0, this.$route.matched.length) || []
    }
  },
};
</script>
<style lang="less" scoped>
.navBar {
  background: #ffffff;
  padding: 0 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
