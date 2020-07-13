export default {
	// 全局抽取菜单组件  用户可以动态配置自己的 菜单列表
	login: 'UNI-ADMIN', //管理系统的login
	navBar: {
		active: '0',
		list: [{
				name: '首页',
				subActive: '0',
				submenu: [{
						name: '首页',
						icon: 'el-icon-s-home',
						pathname:'index'
					},
					{
						name: '相册管理',
						icon: 'el-icon-picture',
						pathname:'image'
					},
					{
						name: '商品列表',
						icon: 'el-icon-s-claim',
						pathname:'shop_goods_list'
					}
				]
			},
			{
				name: '商品',
				subActive: '0',
				submenu: []
			},
			{
				name: '订单',
				subActive: '0',
				submenu: []
			},
			{
				name: '会员',
				subActive: '0',
				submenu: []
			},
			{
				name: '设置',
				subActive: '0',
				submenu: []
			},
		]
	}
}
