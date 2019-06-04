<template>
  <div class="wrap" v-show="visible">
    <div class="alertMain">
      <div class="alertTitle">提 示</div>
      <div class="alertCon">{{content}}</div>
      <button type="button" class="alertBtn" @click="closeAlert">确 定</button>
    </div>
  </div>
</template>
<script>
export default{
  props:['visible', 'content'],
  data () {
    return {}
  },
  methods: {
    closeAlert() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .alertMain {
    width: 400px;
    height: 230px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border-radius: 10px;
    .alertTitle {
      width: 100%;
      height: 32px;
      background: #feaa0b;
      box-sizing: border-box;
      border-radius: 10px 10px 0 0;
      line-height: 32px;
      text-align: center;
      font-size: 20px;
      color: #fff;
    }
    .alertCon {
      padding: 20px;
      height: 185px;
      box-sizing: border-box;
    }
    button {
      border: none;
      width: 50px;
      height: 25px;
      background-color: #f8a507;
      color: #fff;
      outline: none;
      cursor: pointer;
      border-radius: 3px;
      font-size: 16px;
      font-family: 'microsoft yahei';
      position: absolute;
      right: 10px;
      bottom: 5px;
    }
  }
</style>
