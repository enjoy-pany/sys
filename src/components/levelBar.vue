<template>
<div>
  <div class="navBar">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="item in menusList" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			menusList: []
		}
	},
	methods: {
		getNowMenus(menus) {
			for(let item of menus) {
				console.log(item.name,this.$route.name)
				if(item.name == this.$route.name) {
					return item
				}
				getNowMenus(item.children)
			}
		},
		getMenusList(menus) {
			if(!menus.children) return
			this.menusList.push(menus);
			getMenusList(menus.children)
		}
	},
	computed: {
        ...mapState({
            menus: state => state.menus.menuData
        })
    },
    mounted() {
    	// this.getNowMenus(this.menus)
    	
    }
}
</script>
<style lang="less" scoped>

</style>
