<template>
  <div class="componentWrap">
      <el-switch v-model="maindata.value"></el-switch>
  </div>
</template>
<script>
export default {
  props: {
    maindata: {
      type: Object,
      default: {},
    }
  },
  data() {
    return {};
  },
  methods: {
    
  }
};
</script>
<style lang="less">
.componentWrap {

}
</style>