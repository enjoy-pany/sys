<template>
<div>
  <div class="navBar">
    <levelbar></levelbar>
  </div>
  <img :src="imgUrl" alt="">
  <el-button @click="nextPage()">下一张</el-button>
  <!-- <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData"></vue-waterfall-easy> -->
</div>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios'
import levelbar from '@/components/levelbar'
export default {
  data() {
    return {
      imgsArr: [
        'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/1.jpg',
        'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/2.jpg',
        'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/3.jpg',
        'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/4.jpg',
        'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/5.jpg',
        'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/0.jpg'
      ],
      group: 0

    }
  },
  components: {
    vueWaterfallEasy,
    levelbar
  },
  methods: {
    getData() {
      axios.get('api/picture/findgrid?offset=0&limit=70&tag=')
        .then(res => {
          this.imgsArr = this.imgsArr.concat(res.data)
          this.group++
        })
    },
    nextPage() {
      if(this.group>this.imgsArr.length-2) {
        this.$message.error('已经是最后一张了')
      }else {
        this.group++
      }
    }
  },
  computed: {
    imgUrl() {
      let img = new Image()
      img.src = this.imgsArr[this.group]
      img.onload = ()=> {
        console.log('第'+(this.group+1) + '张图片 url: '+this.imgsArr[this.group]+' 加载成功')
        return this.imgsArr[this.group]
      }
      img.onerror = ()=> {
        console.log('第'+(this.group+1) + '张图片 url: '+this.imgsArr[this.group]+' 加载失败')
        this.$message.error('第'+(this.group+1) + '张图片 url: '+this.imgsArr[this.group]+' 加载失败,重新加载数据')
      }
      return this.imgsArr[this.group]
    }
  },
  created() {
    // this.getData()
  }
}
</script>

<style lang="less" scoped>

</style>
