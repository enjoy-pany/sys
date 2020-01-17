<template>
  <div class="componentWrap">
      <el-date-picker type="date" v-model="maindata.value"></el-date-picker>
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