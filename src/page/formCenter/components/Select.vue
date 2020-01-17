<template>
  <div class="componentWrap">
    <el-select v-model="maindata.value">
      <el-option
        v-for="(item, index) in maindata.options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
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
  methods: {}
};
</script>
<style lang="less">
.componentWrap {
}
</style>