<template>
<div class="unionMain content-block">
    <h1 class="content-block-title">
      <i></i>账号详情
    </h1>
    <div class="unionForm">
      <el-form v-loading="loading" ref="form" label-width="100px">
        <el-form-item 
            v-for="item in unionMap"
            :key="item.label"
            :label="item.label+':'">
          <p>{{unionData[item.prop]}}</p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import levelbar from '@/components/levelbar'
import {order} from '@/api/api.js'
const unionMap = [{
    prop: 'groupName',
    label: '公会名称',
    width: ''
},{
    prop: 'groupCode',
    label: '组织代码',
    width: ''
},{
    prop: 'truename',
    label: '真实姓名',
    width: ''
},{
    prop: 'contactPhone',
    label: '手机号',
    width: ''
},{
    prop: 'createTime',
    label: '注册时间',
    width: ''
},{
    prop: 'groupStatusString',
    label: '公会状态',
    width: ''
}]
export default {
    data() {
        return {
            unionMap,
            unionData:{},
            loading: false
        }
    },
    components: {
        // levelbar
    },
    mounted() {
        this.getUnionDetail()
    },
    methods: {
        getUnionDetail(formType) {
            this.loading = true
            this.$http.fetch(order.list)
                .then(res => {
                    this.loading = false
                    this.unionData = res.result
                }, err=> {
                    this.loading = false
                });
        }
    }
}
</script>
<style lang="less" scoped>

</style>
