webpackJsonp([10],{LpLk:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s={data:function(){return{code:"\nfunction getNowMenus(now,menus,node) {\n\tif(menus) {\n\t\tfor(let i in menus) {\n\t\t\tif(menus[i].name == now.name) {\n\t\t\t\tif(!node) {\n\t\t\t\t\treturn\n\t\t\t\t}\n\t\t\t\tthis.menusList.unshift(node)\n\t\t\t\tthis.getNowMenus(node,this.menu,null)\n\t\t\t}else {\n\t\t\t\tthis.getNowMenus(now,menus[i].children,menus[i])\n\t\t\t}\n\t\t}\n\t}\n}\nthis.getNowMenus(this.menusList[0],this.menu,null)\n",cmOption:{mode:"text/javascript"}}}},i={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"content-block"},[e("sub-title",[t._v("面包屑算法")]),t._v(" "),e("codemirror",{attrs:{options:t.cmOption},model:{value:t.code,callback:function(n){t.code=n},expression:"code"}})],1)},staticRenderFns:[]};var o=e("VU/8")(s,i,!1,function(t){e("xhzu")},null,null);n.default=o.exports},xhzu:function(t,n){}});
//# sourceMappingURL=10.b6cedc20f76f61dbf199.js.map