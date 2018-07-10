<template>
<div class="top_nav">
  <el-col :span="24" class="topbar-wrap">
    <div class="topbar-title">
      <span style="font-size: 18px;color: #fff;">后台管理系统</span>
    </div>
    <div class="topbar-account topbar-btn">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link userinfo-inner"><i class="el-icon-service"></i> {{nickname}}  <i
          class="el-icon-caret-bottom"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-col>
</div>
</template>
<script>
export default {
  data() {
    return {
      nickname: 'administrator'
    }
  }
}
</script>
<style lang="less" scoped>
.top_nav {
  .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;
      .topbar-btn {
        color: #fff;
      }
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
}
</style>
