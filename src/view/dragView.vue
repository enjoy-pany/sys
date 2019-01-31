<template>
  <div>
    <h2>Hello, this is drag review</h2>
    <div class="dragWarp">
      <div class="box" v-drag>拖我</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  data() {
    return {
      isOpen: false,
      message: '这是测试数据，这是测试数据'
    }
  },
  directives: {
    drag: {
      inserted: function(target) {
        target.onmousedown = function(ev) {
          var disX = ev.clientX - target.offsetLeft;
          var disY = ev.clientY - target.offsetTop;
          document.onmousemove = function(eve){
              target.style.left = eve.clientX - disX + 'px';
              target.style.top = eve.clientY - disY + 'px';
              //Data.configData.dragData[_index].x = (eve.clientX - disX)/showWidth*100;
              //Data.configData.dragData[_index].y = (eve.clientY - disY)/showHeight*100;
          }
          document.onmouseup = function(){
              document.onmousemove = null;
              document.onmouseup = null;
          }
          return false;
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
h2 {
  text-align: center;
}
.dragWarp {
  width: 100%;
  height: 100%;
  .box {
    width: 100px;
    height: 100px;
    background: green;
    position: absolute;
    color: #fff;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
  }

}
</style>
