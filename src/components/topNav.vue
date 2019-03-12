<template>
<div class="top_nav">
  <el-col :span="24" class="topbar-wrap">
    <div class="topbar-title">
      <span>SYS</span>
    </div>
    <div class="topbar-account topbar-btn">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link userinfo-inner"><i class="el-icon-service"></i> {{nickname}}  <i
          class="el-icon-caret-bottom"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="jumpTo('/user/profile')"><span>个人信息</span></div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="jumpTo('/user/changepwd')"><span>修改密码</span></div>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-col>
</div>
</template>
<script>
import {user} from '@/api/api.js'
export default {
  data() {
    return {
      nickname: 'administrator'
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$http.fetch(user.info)
      .then(res => {
          console.log(res)
          if(res.errCode == 1) {
            console.log('成功')
            this.nickname = res.result.userName
          }else {
            this.$message.error(res.errMess)
          }
      }, err=> {
          this.$message.error('服务器错误')
      });
    }
  }
}
</script>
<style lang="less" scoped>
.top_nav {
  .topbar-wrap {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px 20px;
    box-sizing: border-box;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .topbar-btn {
      color: #fff;
    }
    .topbar-title {
      span {
        font-size: 18px;
        color: #fff;
      }
    }
    .topbar-account {
      .userinfo-inner {
        font-size: 16px;
        cursor: pointer;
        color: #fff;
      }
    }

  }
}
</style>
