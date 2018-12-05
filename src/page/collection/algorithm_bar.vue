<template>
  <div class="code">
    <pre>
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
    </pre>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">

</style>
