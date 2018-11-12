<template>
  <div class="navBar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in menusList" :to="{ path: item.path }" :key="item.name">{{item.name}}</el-breadcrumb-item>
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
    watch: {
	    '$route' (val, old) {
	        // 当前路由
	        // console.log(val)
	        // 上一个路由
	        // console.log(old)
	        this.menusList.splice(0,this.menusList.length)
	        this.initMenus()
	    }
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
