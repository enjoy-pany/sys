<template>
  <div>
    <h2>Hello, this is select_search review</h2>
    <selectSearch :dataArr="jcType" @seleChage="seleChageFn"></selectSearch>
  </div>
</template>

<script>
import selectSearch from '../components/SelectSearch'
export default {
  name: 'select_search_review',
  data () {
    return {
      jcType: [
          {
            name: 'liming'
          },
          {
            name: 'zhhangsan'
          },
          {
            name: 'lisi'
          },
          {
            name: 'wangwu'
          }
        ]
    }
  },
  components: {
    selectSearch
  },
  methods: {
    seleChageFn (data) {
      console.log(data)
    }
  }
}

</script>

<style lang="less" scoped>
  h2 {
    text-align: center;
  }
</style>
