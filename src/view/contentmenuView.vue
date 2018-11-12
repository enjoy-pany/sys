<template>
  <div>
    <h2>Hello, this is drag review</h2>
    <div class="dragWarp" v-menu>
      右键我？
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
    menu: {
      inserted: function(target){
        target.oncontextmenu = function(){
            //do something......
            //Data.configData.dragData[_index].menu = true;
            alert('你想干啥？')
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
  width: 300px;
  height: 300px;
  border: 1px #333 solid;
  text-align: center;

}
</style>
