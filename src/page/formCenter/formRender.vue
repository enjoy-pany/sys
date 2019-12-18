<template>
  <div class="formMain">
    <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="80px">
      <div class="form-item" v-for="item in formRenderData" :key="item.id">
        <el-form-item v-if="item.type === 1" :label="item.name" :prop="item.key">
          <el-input v-model="form[item.key]"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {},
        rules: {},
        formRenderData: [
          {
            id: '1',
            index: 1,
            type: 1, // 1:input 2:select 

            name: '活动名称', //label
            key: 'name',
            value: null,
            options: [],
            // 基础配置
            config: {
              defaultValue: '',
              placeholder: '请输入活动名称',
              tips: ''
            },
            // 校验
            verify: { 
              isRequire: true,
              message: '请填写活动名称',
              rules: [
                {
                  validator: (rule, value, callback) => {
                    console.log(value)
                    callback()
                  },
                  trigger: ''
                }
              ]
            },
            // 关联信息
            related: {
              
            }

          }
        ]
      }
    },
    created() {
      this.initFormData()
    },
    methods: {
      initFormData() {
        this.formRenderData.map(item => {
          this.$set(this.form,item.key,item.value)
        })
        this.initRules()
      },
      initRules() {
        this.formRenderData.map(item => {
          this.rules[item.key] = [
            {required: item.verify.isRequire, message: item.verify.message || `${item.name}不可为空！`},
            ...item.verify.rules
          ]
        })
      },
      onSubmit() {
        console.log('formData===>',this.form);
      }
    }
  }
</script>
<style scoped lang="less">

</style>