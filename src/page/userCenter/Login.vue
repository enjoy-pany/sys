<template>
<div class="loginMain">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2">
       <el-form-item prop="age">
            <el-input 
                v-model.number="ruleForm2.age" 
                placeholder="请输入用户名"
                prefix-icon="el-icon-service">
            </el-input>
        </el-form-item>
        <el-form-item prop="pass">
            <el-input 
                type="password" 
                v-model="ruleForm2.pass"
                placeholder="请输入密码" 
                autocomplete="off" 
                prefix-icon="el-icon-edit">
            </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-col :span="12">
                <el-input 
                    type="password" 
                    v-model="ruleForm2.checkPass" 
                    autocomplete="off"
                    prefix-icon="el-icon-mobile-phone">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
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
