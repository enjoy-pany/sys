<template>
  <div class="content-block">
    <sub-title>分页</sub-title>
    <div class="view">
      <pageNav :limit="limit" :pages="pages" @pagechange="pageChangeFn"></pageNav>
    </div>
    <sub-title>code-review</sub-title>
    <div class="codeReview">
      <my-code>
        <div v-text="codeHtml"></div>
      </my-code>
    </div>
  </div>
</template>

<script>
import pageNav from '../components/Pagination'
const codeHtml = `
  template:

  <ul class="pageNav">
    <p>共 {{pages}} 条</p>
    <li @click="prvePage(nowPage)">&lt;</li>
    <div class="pageCon">
      <li v-for="(pageItem, index) in pageItemCom"
        :key="index"
        :class="{active: nowPage == pageItem}" 
        @click="gotoPage(pageItem, index)">
        {{pageItem < 1 ? "..." : pageItem}}
      </li>
    </div>
    <li @click="nextPage(nowPage)">&gt;</li>
  </ul>

  script: 
  export default {
    name: 'tk-pagination',
    props: {
      limit: { //每页显示多少页
        type: Number,
        default: 1
      },
      pages: { //总页数
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        nowPage: 1
      }
    },
    methods: {
      gotoPage(item) {
        if (item <= 0) return // ...跳页处理
        this.nowPage = item
        this.$emit('pagechange', item)
      },
      nextPage(data) {
        if (this.nowPage >= this.pages) return
        this.gotoPage(this.nowPage + 1)
      },
      prvePage(data) {
        if (this.nowPage <= 1) return
        this.gotoPage(this.nowPage - 1)
      }
    },
    computed: {
      pageItemCom() {
        var left = 1
        var right = this.pages
        var ar = []
        if (this.pages >= 11) {
          if (this.nowPage > 5 && this.nowPage < this.pages - 4) {
            left = this.nowPage - 5
            right = this.nowPage + 4
          } else {
            if (this.nowPage <= 5) {
              left = 1
              right = 10
            } else {
              right = this.pages
              left = this.pages - 9
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        if (ar[0] > 1) {
          ar[0] = 1;
          ar[1] = -1;
        }
        if (ar[ar.length - 1] < this.pages) {
          ar[ar.length - 1] = this.pages;
          ar[ar.length - 2] = 0;
        }
        return ar
      }
    }
  }

  style:
  
  .pageNav {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    p {
      margin-right: 10px;
    }
    li {
      display: inline-block;
      min-width: 30px;
      height: 30px;
      padding: 0 5px;
      border: 1px #ccc solid;
      margin-left: -1px;
      margin-top: 0;
      text-align: center;
      line-height: 30px;
      background-color: #fff!important;
      cursor: pointer;
    }
    .pageCon {
      // max-width: 310px;
      height: 32px;
      overflow: hidden;
      .active {
        background-color: #fcc800!important;
        color: #fff
      }
    }
  }
`
export default {
  name: 'pagination',
  data () {
    return {
      limit: 10,
      pages: 101,
      codeHtml
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
  .view {
    min-height: 100px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
  }
</style>
