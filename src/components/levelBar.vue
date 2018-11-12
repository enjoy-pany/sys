<template>
  <div class="navBar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in menusList" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
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
		getNowMenus(now,menus,node) {
			if(menus) {
				for(let i in menus) {				
					if(menus[i].name == now.name) {
						if(!node) {
							return 
						}
						this.menusList.unshift(node)
						this.getNowMenus(node,this.menu,null)
					}else {
						this.getNowMenus(now,menus[i].children,menus[i])
					}
				}
			}
		},
		initMenus() {
			this.menusList.push(this.$route)
	    	this.getNowMenus(this.menusList[0],this.menu,null)
		}
	},
	computed: {
        ...mapState({
            menu: state => state.menus.menuData
        })
    },
    mounted() {
    	this.initMenus()	
    }
}
</script>
<style lang="less" scoped>
	.navBar {
		margin-bottom: 20px;
	}
</style>
