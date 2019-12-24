<template>
  <el-aside width="200px" class="navLeft">
    <el-menu
      @open="handleOpen"
      @close="handleClose">
      <template v-for="(item, index) in menus">
        <div class="menuList" :key="item.name" v-show="!item.disabled">
          <el-menu-item v-if="!item.children" :index="`${index}`" @click="goPath(item.path)">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.name }}</span>
          </el-menu-item>
          <el-submenu v-else :key="index" :index="`${index}`">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item 
                v-for="(mItem, mIndex) in item.children" 
                :index="`${index}-${mIndex}`"
                :key="mItem.name"
                @click="goPath(mItem.path)">{{mItem.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
        
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapState } from 'vuex';
export default {
 data() {
   return {
   }
 },
 methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goPath(path) {
      this.$router.push({
        path
      })
    }
  },
  computed: {
      ...mapState({
          menus: state => state.menus.menuData
      })
  },
}
</script>
<style lang="less" scoped>
  .navLeft {
    min-height: calc(100vh - 100px);
    background-color: #fff;
    margin-right: 10px;
    ul {
      width: 200px;
      height: 100%;
    }
  }
</style>
