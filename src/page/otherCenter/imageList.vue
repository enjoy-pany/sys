<template>
<div>
  <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData"></vue-waterfall-easy>
</div>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios'
export default {
  data() {
    return {
      imgsArr: [],
      group: 0

    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData() {
      axios.get('api/picture/findgrid?offset=0&limit=70&tag=')
        .then(res => {
          this.imgsArr = this.imgsArr.concat(res.data)
          this.group++
        })
    },
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>

</style>
