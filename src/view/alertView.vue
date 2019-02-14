<template>
  <div class="content-block">
    <sub-title>alert弹框</sub-title>
    <div class="view">
      <Alert :visible.sync="isOpen" :content="message"></Alert>
      <el-button type="primary" @click="openAlertFn">打开弹窗</el-button>
    </div>
    <sub-title>code-review</sub-title>
    <div class="codeReview">
      <!-- <my-code>
      </my-code>-->
      <codemirror v-model="code"></codemirror>
    </div>
  </div>
</template>

<script>
import Alert from "../components/Alert";
export default {
  name: "alert",
  data() {
    return {
      isOpen: false,
      message: "这是测试数据，这是测试数据",
      code: ''
    };
  },
  components: {
    Alert
  },
  methods: {
    openAlertFn() {
      this.isOpen = true;
    },
    getComponentsData() {
      this.$http.fetch('../../static/components/Alert.vue').then(
        res => {
          if(res) {
            this.code = res
          }
        },
        err => {
          console.log(err)
        }
      );
    }
  },
  mounted() {
    this.getComponentsData()
  }
};
</script>

<style lang="less">
  @import url('./view.less');
</style>