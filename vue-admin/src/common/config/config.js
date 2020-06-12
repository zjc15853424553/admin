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
						icon: 'el-icon-s-home'
					},
					{
						name: '商品',
						icon: 'el-icon-s-claim'
					}
				]
			},
			{
				name: '商品',
				subActive: '0',
				submenu: [{
						name: '首页1',
						icon: 'el-icon-s-home'
					},
					{
						name: '商品1',
						icon: 'el-icon-s-claim'
					}
				]
			},
			{
				name: '订单',
				subActive: '0',
				submenu: [{
						name: '首页2',
						icon: 'el-icon-s-home'
					},
					{
						name: '商品2',
						icon: 'el-icon-s-claim'
					}
				]
			},
			{
				name: '会员',
				subActive: '0',
				submenu: [{
						name: '首页3',
						icon: 'el-icon-s-home'
					},
					{
						name: '商品3',
						icon: 'el-icon-s-claim'
					}
				]
			},
			{
				name: '设置',
				subActive: '0',
				submenu: [{
						name: '首页4',
						icon: 'el-icon-s-home'
					},
					{
						name: '商品4',
						icon: 'el-icon-s-claim'
					}
				]
			},
		]
	}
}
