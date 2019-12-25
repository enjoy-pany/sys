<template>
  <div class="formMain">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <div class="form-item" v-for="item in formRenderData" :key="item.id">
        <el-form-item v-if="item.type === 1" :label="item.name" :prop="item.key">
          <el-col :span="6">
            <el-input v-model="form[item.key]" :placeholder="item.config.placeholder"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-if="item.type === 2" :label="item.name" :prop="item.key">
          <el-date-picker
            v-model="form[item.key]"
            value-format="timestamp"
            type="datetime"
            :placeholder="item.config.placeholder"
            :picker-options="item.config.disabled()"></el-date-picker>
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

  // type: 1 input
  //       2: date-picker


  export default {
    data() {
      return {
        form: {},
        rules: {},
        formRenderData: [
          {
            id: '1',
            index: 1,
            type: 1,
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
            related: {}
          },
          {
            id: '2',
            index: 2,
            type: 2, 
            name: '开始时间', //label
            key: 'starTime',
            value: null,
            options: [],
            // 基础配置
            config: {
              defaultValue: '',
              placeholder: '请输入活动开始时间',
              tips: '',
              disabled() {
                return {
                  disabledDate(time){
                    return time.getTime() < new Date(new Date(new Date().toLocaleDateString()).getTime())
                  }
                }
              }
            },
            // 校验
            verify: { 
              isRequire: true,
              message: '请填写活动开始时间',
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
            related: {}
          },
          {
            id: '3',
            index: 3,
            type: 2, 
            name: '结束时间', //label
            key: 'endTime',
            value: null,
            options: [],
            // 基础配置
            config: {
              defaultValue: '',
              placeholder: '请输入活动结束时间',
              tips: '',
              disabled() {
                let self = this
                return {
                  disabledDate(time){
                    return time.getTime() < new Date(new Date(new Date().toLocaleDateString()).getTime())
                  }
                }
              }
            },
            // 校验
            verify: { 
              isRequire: true,
              message: '请填写活动结束时间',
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
            related: {}
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
.formMain {
  background: #fff;
  padding: 20px;
}
</style>