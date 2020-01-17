<template>
  <div class="componentWrap">
      <el-input type="textarea" v-model="maindata.value"></el-input>
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