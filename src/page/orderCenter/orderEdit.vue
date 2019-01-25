<template>
<div class="unionMain content-block">
    <h1 class="content-block-title">
      <i></i>账号详情
    </h1>
    <orderForm
        :unionData="unionData">
    </orderForm>
  </div>
</template>
<script>
import orderForm from '@/page/orderCenter/oderForm.vue'
import {order} from '@/api/api.js'
export default {
    data() {
        return {
            unionData:{},
            loading: false
        }
    },
    components: {
        orderForm
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
