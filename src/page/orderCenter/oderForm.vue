<template>
    <div class="unionForm">
      <el-form v-loading="loading" :model="formData" ref="form" label-width="100px">
        <el-form-item label="公会名称">
          <el-input v-model="formData.groupName" placeholder="公会名称"></el-input>
        </el-form-item>
        <el-form-item label="组织代码">
          <el-input v-model="formData.groupCode" placeholder="组织代码"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="formData.truename" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.contactPhone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-input v-model="formData.createTime" placeholder="注册时间"></el-input>
        </el-form-item>

      </el-form>
    </div>
</template>
<script>
export default {
    props: {
        unionData: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data() {
        return {
            // formData: {},
            loading: false
        }
    },
    components: {
        // levelbar
    },
    computed: {
        formData() {
            return this.unionData
        }
    },
    mounted() {
        console.log(this.unionData)
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>

</style>
