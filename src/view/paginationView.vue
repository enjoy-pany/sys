<template>
  <div>
    <h2>Hello, this is pagination review</h2>
    <pageNav :limit="limit" :pages="pages" @pagechange="pageChangeFn"></pageNav>
  </div>
</template>

<script>
import pageNav from '../components/Pagination'
export default {
  name: 'pagination',
  data () {
    return {
      limit: 10,
      pages: 101
    }
  },
  components: {
    pageNav
  },
  methods: {
    pageChangeFn (data) {
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
