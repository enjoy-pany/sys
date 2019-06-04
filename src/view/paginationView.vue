<template>
  <div class="content-block">
    <sub-title>分页</sub-title>
    <div class="view">
      <pageNav :limit="limit" :pages="pages" @pagechange="pageChangeFn"></pageNav>
    </div>
    <sub-title>code-review</sub-title>
    <div class="codeReview">
      <!-- <my-code>
        <div v-text="codeHtml"></div>
      </my-code> -->
      <codemirror v-model="code"></codemirror>
    </div>
  </div>
</template>

<script>
import pageNav from '../components/Pagination'
export default {
  name: 'pagination',
  data () {
    return {
      limit: 10,
      pages: 101,
      code: ''
    }
  },
  components: {
    pageNav
  },
  methods: {
    pageChangeFn (data) {
      console.log(data)
    },
    getComponentsData() {
      this.$http.fetch('./static/components/Pagination.vue').then(
        res => {
          if(res) {
            this.code = res
          }
        },
        err => {
          console.log(err)
        }
      );
    }
  },
  mounted() {
    this.getComponentsData()
  }
}

</script>

<style lang="less">
  @import url('./view.less');
</style>

