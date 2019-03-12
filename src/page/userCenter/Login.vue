<template>
<div class="loginWrap">
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
            <el-col :span="15">
                <el-input 
                    v-model="ruleForm.telCode" 
                    autocomplete="off"
                    prefix-icon="el-icon-mobile-phone">
                </el-input>
            </el-col>
            <el-col :span="8" style="margin-left: 14px;">
              <img :src="codeUrl" class="codeImg" alt="">
            </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-button type="primary" style="width: 100%;" @click="submitForm('ruleForm')">登陆</el-button>
          </el-col>
        </el-form-item>
        <div class="tips">
          <el-checkbox v-model="noPass">7天免密登陆</el-checkbox>
          <a href="">忘记密码？</a>
        </div>
    </el-form>
  </div>
</div>

</template>
<script>
import {user} from '@/api/api.js'
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
        noPass: false, //免密登陆
        ruleForm: {
          name: '',
          pass: '',
          telCode: ''
        },
        codeUrl: './static/images/code.jpg',
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
            const param = this.ruleForm
            this.$http.post(user.login, param)
            .then(res => {
                if(res.errCode == 1) {
                  this.$message.success('登陆成功')
                  this.$router.push({path: '/'})
                }else {
                  this.$message.error(res.errMess)
                }
            }, err=> {
                this.$message.error('服务器错误')
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped>
.loginWrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: radial-gradient(at 35px 35px, #fff, #9ac4c9);
  background: -webkit-radial-gradient(at 35px 35px, #fff, #9ac4c9); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient( at 35px 35px, #fff, #9ac4c9); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient( at 35px 35px, #fff, #9ac4c9); /* Firefox 3.6 - 15 */
  .loginMain {
    width: 400px;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    position: absolute;
    right: 200px;
    top: 100px;
    .tips {
      width: 100%;
      height: auto;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .codeImg {
      display: block;
      width: 100%;
      height: 40px;
    }
  }
}
</style>
