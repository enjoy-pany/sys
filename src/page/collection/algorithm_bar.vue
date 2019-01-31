<template>
<div class="content-block">
	<sub-title>面包屑算法</sub-title>
	<my-code>
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
	</my-code>
</div>	
</template>
<script>
export default {
}
</script>
<style lang="less">

</style>
