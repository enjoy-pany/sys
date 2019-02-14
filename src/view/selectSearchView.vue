<template>
  <div class="content-block">
    <sub-title>搜索下拉框</sub-title>
    <div class="view">
      <selectSearch :dataArr="jcType" @seleChage="seleChageFn"></selectSearch>
    </div>
    <sub-title>code-review</sub-title>
    <div class="codeReview">
       <codemirror v-model="code"></codemirror>
    </div>
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
      ],
      code: ''
    }
  },
  components: {
    selectSearch
  },
  methods: {
    seleChageFn (data) {
      console.log(data)
    },
    getComponentsData() {
      this.$http.fetch('../../static/components/SelectSearch.vue').then(
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

<style lang="less" scoped>
  @import url('./view.less');
</style>
<style>
.CodeMirror {
  height: 100%;
}
</style>