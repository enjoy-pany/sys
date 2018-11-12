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
		name: '其他',
		path: '/othercenter',
		meta: {
			icon: 'el-icon-picture'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
		children: [
			{
				name: '图片列表',
				path: '/othercenter/imagelist',
				component: _ => import('../../page/otherCenter/imageList.vue'),
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