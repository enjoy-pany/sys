<template>
  <div class="content-block">
    <sub-title>alert弹框</sub-title>
    <div class="view">
      <Alert :visible.sync="isOpen" :content="message"></Alert>
      <el-button type="primary" @click="openAlertFn">打开弹窗</el-button>
    </div>
    <sub-title>code-review</sub-title>
    <div class="codeReview">
      <my-code>
      </my-code>
    </div>
    
  </div>
</template>

<script>
import Alert from '../components/Alert'
export default {
  name: 'alert',
  data () {
    return {
      isOpen: false,
      message: '这是测试数据，这是测试数据'
    }
  },
  components: {
    Alert
  },
  methods: {
    openAlertFn() {
      this.isOpen = true
    }
  }
}

</script>

<style lang="less" scoped>
  .view {
    min-height: 100px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
  }
</style>
