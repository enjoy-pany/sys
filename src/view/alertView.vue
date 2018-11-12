<template>
  <div>
    <h2>Hello, this is alert review</h2>
    <Alert :visible.sync="isOpen" :content="message"></Alert>
    <button type="button" @click="openAlertFn">打开弹窗</button>
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
  h2 {
    text-align: center;
  }
</style>
