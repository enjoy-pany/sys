<template>
  <div class="componentWrap">
    <el-radio-group v-model="maindata.value">
      <el-radio
        v-for="(item, index) in maindata.options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-radio>
    </el-radio-group>
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