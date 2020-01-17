<template>
  <div class="componentWrap">
    <el-checkbox-group v-model="maindata.value">
      <el-checkbox
        v-for="(item, index) in maindata.options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-checkbox>
    </el-checkbox-group>
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