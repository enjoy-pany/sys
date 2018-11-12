<template>
  <div class="seleSearch">
    <input type="text" v-model="seleName" @focus="openSele" @blur.prevent="closeSele">
    <div class="seleList" v-if="isSelect">
      <div class="seleItem" v-for="(item, index) in jcTypeCom" @click="seleClick(item)">{{item.name}}</div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'select_search',
    props: {
      dataArr: { //总数据
        type: Array,
        default: function() {
          return [
            {
              name: 'test1'
            },
            {
              name: 'test2'
            },
            {
              name: 'test3'
            }
          ]
        }
      }
    },
    data () {
      return {
        isSelect: false,
        seleName: ''
      }
    },
    methods: {
      openSele() {
        this.isSelect = true
      },
      closeSele() {
        let that = this
        setTimeout(function(){
          that.isSelect = false
        },250)
      },
      seleClick(item) {
        this.$emit('seleChage', item)
      }
    },
    computed: {
      jcTypeCom() {
        var that = this
        return that.dataArr.filter(function (data) {
          return data.name.toLowerCase().indexOf(that.seleName.toLowerCase()) !== -1;
        })
      }

    }

  }

</script>

<style lang="less" scoped>
  .seleSearch {
    width: 200px;
    height: 32px;
    margin-left: 5px;
    position: relative;
    input {
      width: 180px;
      height: 30px;
      border-radius: 3px 0 0 3px;
      border: 1px solid #d1d1d1;
      outline: none;
      box-shadow: inset 1px 1px 1px #eee;
      position: absolute;
    }
    select {
      max-width: 200px;
      height: 100%;
    }
    .seleList {
      position: absolute;
      top: 100%;
      max-width: 400px;
      max-height: 300px;
      overflow-y: scroll;
      z-index: 99;
      background-color: #fff;
      border: 1px #d1d1d1 solid;
      .seleItem {
        line-height: 30px;
        word-spacing: normal;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 5px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover{
          background-color: #f1f1f1;
        }
      }
    }
  }
</style>
