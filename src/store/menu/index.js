const menu = [
	{
		name: '首页',
		path: '/',
		meta: {
			icon: 'el-icon-menu'
		},
		component: _ => import('../../page/main.vue'),
		redirect: '',
		// children: []
	},
	{
		name: '工单中心',
		path: '/ordercenter',
		meta: {
			icon: 'el-icon-location'
		},
		component: _ => import('../../page/orderCenter/orderList.vue'),
		redirect: '',
		children: [
			{
				name: '工单列表',
				path: '/ordercenter/orderlist',
				meta: {
					icon: 'el-icon-location'
				},
				// component: _ => import('../../page/orderCenter/orderList.vue'),
				redirect: '',
				// children: []

			}
		]

	}
]
export default {
	state: {
		menuData: menu
	}
}