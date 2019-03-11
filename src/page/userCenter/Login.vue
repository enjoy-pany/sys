<template>
<div class="loginMain">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
       <el-form-item prop="name">
            <el-input 
                v-model.number="ruleForm.name" 
                placeholder="请输入用户名"
                prefix-icon="el-icon-service">
            </el-input>
        </el-form-item>
        <el-form-item prop="pass">
            <el-input 
                type="password" 
                v-model="ruleForm.pass"
                placeholder="请输入密码" 
                autocomplete="off" 
                prefix-icon="el-icon-edit">
            </el-input>
        </el-form-item>
        <el-form-item prop="telCode">
            <el-col :span="12">
                <el-input 
                    v-model="ruleForm.telCode" 
                    autocomplete="off"
                    prefix-icon="el-icon-mobile-phone">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else {
          callback()
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateTelCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          pass: '',
          telCode: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          telCode: [
            { validator: validateTelCode, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less" scoped>
.loginMain {
    width: 400px;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    position: absolute;
    right: 200px;
    top: 100px;
}
</style>
