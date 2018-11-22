const menu = [
	{
		name: '首页',
		path: '/',
		meta: {
			icon: 'el-icon-menu'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
	},
	{
		name: '工单中心',
		path: '/ordercenter',
		meta: {
			icon: 'el-icon-tickets'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
		children: [
			{
				name: '工单列表',
				path: '/ordercenter/orderlist',
				component: _ => import('../../page/orderCenter/orderList.vue'),
				redirect: '',
				children: [
					{
						name: '工单详情',
						path: '/ordercenter/orderlist/orderdetail',
						component: _ => import('../../page/orderCenter/orderDetail.vue'),
						redirect: '',

					}
				]

			}
		]

	},
	{
		name: '图片中心',
		path: '/imagecenter',
		meta: {
			icon: 'el-icon-picture'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
		children: [
			{
				name: '图片列表',
				path: '/imagecenter/imagelist',
				component: _ => import('../../page/imagecenter/imageList.vue'),
				redirect: '',

			},
			{
				name: '瀑布流',
				path: '/imagecenter/imagelist',
				component: _ => import('../../page/imagecenter/imageList.vue'),
				redirect: '',

			}
		]

	},
	{
		name: '多媒体',
		path: '/mediacenter',
		meta: {
			icon: 'el-icon-news'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
		children: [
			{
				name: '音频大世界',
				path: '/mediacenter/mutiaudio',
				// component: _ => import('../../page/mediaCenter/mutiAudio.vue'),
				redirect: '',

			},
			{
				name: '在线教室',
				path: '/imagecenter/imagelist',
				component: _ => import('../../page/imagecenter/imageList.vue'),
				redirect: '',

			},
			{
				name: '视频资源',
				path: '/imagecenter/imagelist',
				component: _ => import('../../page/imagecenter/imageList.vue'),
				redirect: '',

			}
		]

	},
	{
		name: 'Canvas',
		path: '/canvas',
		meta: {
			icon: 'el-icon-edit'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
		children: [
			{
				name: '图形绘制与命中检测',
				path: '/canvas/draw',
				component: _ => import('../../page/canvasDemo/draw.vue'),
				redirect: '',

			},
			{
				name: '图片缩放及拖拽',
				path: '/canvas/scale',
				component: _ => import('../../page/canvasDemo/scale.vue'),
				redirect: '',

			},
			{
				name: '边界判定',
				path: '/canvas/imagelist',
				component: _ => import('../../page/imagecenter/imageList.vue'),
				redirect: '',

			}
		]

	},
	{
		name: '个人组件库',
		path: '/component',
		meta: {
			icon: 'el-icon-goods'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
		children: [
		    {
		    	path: '/component/pagination',
		      	name: '分页',
		      	component: _ => import('../../view/paginationView.vue')
		    },
		    {
		    	path: '/component/select_search',
		      	name: '搜索下拉框',
		      	component: _ => import('../../view/selectSearchView.vue')
		    },
		    {
		    	path: '/component/alert',
		      	name: 'Alert弹框',
		      	component: _ => import('../../view/alertView.vue')
		    },
		    // {
		    // 	path: '/component/swiper',
		    //   	name: '轮播',
		    //   	component: _ => import('../../view/swiperView.vue')
		    // },
		    {
		    	path: '/component/drag',
		      	name: '拖拽',
		      	component: _ => import('../../view/dragView.vue')
		    },
		    {
		    	path: '/component/contentmenu',
		      	name: '自定义右键菜单',
		      	component: _ => import('../../view/contentmenuView.vue')
		    },
		    {
		    	path: '/component/scroll_top',
		      	name: '吸顶菜单栏',
		      	component: _ => import('../../view/scrollTopView.vue')
		    },
		    {
		    	path: '/component/anchor',
		      	name: '锚点定位',
		      	component: _ => import('../../view/anchorView.vue')
		    }
		]

	},
	{
		name: '收藏',
		path: '/collection',
		meta: {
			icon: 'el-icon-star-off'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
		children: [
			{
				name: 'menu抽离及面包屑算法',
				path: '/collection/imagelist',
				component: _ => import('../../page/imagecenter/imageList.vue'),
				redirect: '',

			},
			{
				name: 'lalala',
				path: '/collection/imagelist',
				component: _ => import('../../page/imagecenter/imageList.vue'),
				redirect: '',

			}
		]

	}
]
export default {
	state: {
		menuData: menu
	}
}