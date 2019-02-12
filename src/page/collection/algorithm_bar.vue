<template>
<div class="content-block">
	<sub-title>面包屑算法</sub-title>
	<codemirror v-model="code" :options="cmOption"></codemirror>
</div>	
</template>
<script>
const code = `
function getNowMenus(now,menus,node) {
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
}
this.getNowMenus(this.menusList[0],this.menu,null)
`
export default {
	data() {
		return {
			code,
			cmOption: {
				mode: 'text/javascript'
			}
		}
	}
}
</script>
<style lang="less">

</style>
