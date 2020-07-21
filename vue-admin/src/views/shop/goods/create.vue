<template>
	<div class="bg-white px-3 shop_create" style="margin: -20px;margin-top: -1rem;">
		<router-link :to="{name:'shop_goods_list'}" style="position: absolute;left: 180px;top: 12px;z-index: 100;">
			<el-button plain size="mini">回到商品列表</el-button>
		</router-link>
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane label="基础设置">
				<el-form ref="form" label-width="80px">
					<el-form-item label="商品名称">
						<el-input class="w-50" v-model="form.title" placeholder='请输入商品名称,不能超过60个字'></el-input>
					</el-form-item>
					<el-form-item label="商品分类">
						<el-cascader v-model="form.category" :options="options" clearable></el-cascader>
					</el-form-item>
					<el-form-item label="商品描述">
						 <el-input type="textarea" class="w-25" v-model="form.desc" placeholder="选填,商品卖点描述,例如:此款商品美观大方性价比高不容错过"></el-input>
					</el-form-item>
					<el-form-item label="商品单位">
						<el-input v-model="form.unit" class="w-25" placeholder="请输入商品单位"></el-input>
					</el-form-item>
					<el-form-item label="总库存">
						<el-input v-model="form.stock" class="w-25" type="number">
							<template slot="append">件</template>
						</el-input>
					</el-form-item>
					<el-form-item label="库存预警">
						<el-input v-model="form.min_stock" class="w-25" type="number">
							<template slot="append">件</template>
						</el-input>
					</el-form-item>
					<el-form-item label="库存显示">
						<el-radio-group v-model="form.display_stock">
							<el-radio :label="0" border>否</el-radio>
							<el-radio :label="1" border>是</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="是否上架">
						<el-radio-group v-model="form.status">
							<el-radio :label="0" border>放入仓库</el-radio>
							<el-radio :label="1" border>立即上架</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="运费模板">
						<el-select v-model="form.express" placeholder="请选择活动区域">
							<el-option label="区域一" value="模板一"></el-option>
							<el-option label="区域二" value="模板二"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="商品规格">
				<el-form ref="form" label-width="80px">
					<el-form-item label="商品规格">
						<el-radio-group v-model="skus_type" size="mini">
							<el-radio-button :label="0">单规格</el-radio-button>
							<el-radio-button :label="1">多规格</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<el-form ref="form" label-width="80px">
					<el-form-item label="添加规格">
						<div class="card" style="line-height: 1.2rem;">
							<div class="card-header d-flex align-items-center">
								规格项: 
								<el-input type="text" style="width: 200px; margin-left: 10px;" size="mini">
									 <el-button slot="append" icon="el-icon-search"></el-button>
								</el-input>
								<el-radio-group v-model="form.resource" class="ml-2"  style="margin-bottom: -10px;">
									<el-radio label="无"></el-radio>
									<el-radio label="颜色"></el-radio>
									<el-radio label="图片"></el-radio>
								</el-radio-group>
							</div>
							<div class="card-body">345</div>
						</div>
					</el-form-item>
					<el-form-item label="批量设置">
						<el-button size="mini">销售价</el-button>
						<el-button size="mini">市场价</el-button>
						<el-button size="mini">成本价</el-button>
						<el-button size="mini">库存</el-button>
						<el-button size="mini">体积</el-button>
						<el-button size="mini">重量</el-button>
					</el-form-item>
					<el-form-item label="规格设置">规格设置</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="商品属性">基础设置</el-tab-pane>
			<el-tab-pane label="媒体设置">基础设置</el-tab-pane>
			<el-tab-pane label="商品详情">基础设置</el-tab-pane>
			<el-tab-pane label="折扣设置">基础设置</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				skus_type:0,//规格选择 0  1
				form: {
					title: '',//商品名称
					category:[],//商品类别
					desc:'',//商品描述
					unit:'',//商品单位
					stock:0,//库存
					min_stock:0,//库存预警
					display_stock:0,//是否显示
					status:0,//是否上架
					express:'',//运费模板
				},
				options: [{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则',
						children: [{
							value: 'yizhi',
							label: '一致'
						}, {
							value: 'fankui',
							label: '反馈'
						}, {
							value: 'xiaolv',
							label: '效率'
						}, {
							value: 'kekong',
							label: '可控'
						}]
					}, {
						value: 'daohang',
						label: '导航',
						children: [{
							value: 'cexiangdaohang',
							label: '侧向导航'
						}, {
							value: 'dingbudaohang',
							label: '顶部导航'
						}]
					}]
				}, {
					value: 'zujian',
					label: '组件',
					children: [{
						value: 'basic',
						label: 'Basic',
						children: [{
							value: 'layout',
							label: 'Layout 布局'
						}, {
							value: 'color',
							label: 'Color 色彩'
						}, {
							value: 'typography',
							label: 'Typography 字体'
						}, {
							value: 'icon',
							label: 'Icon 图标'
						}, {
							value: 'button',
							label: 'Button 按钮'
						}]
					}, {
						value: 'form',
						label: 'Form',
						children: [{
							value: 'radio',
							label: 'Radio 单选框'
						}, {
							value: 'checkbox',
							label: 'Checkbox 多选框'
						}, {
							value: 'input',
							label: 'Input 输入框'
						}, {
							value: 'input-number',
							label: 'InputNumber 计数器'
						}, {
							value: 'select',
							label: 'Select 选择器'
						}, {
							value: 'cascader',
							label: 'Cascader 级联选择器'
						}, {
							value: 'switch',
							label: 'Switch 开关'
						}, {
							value: 'slider',
							label: 'Slider 滑块'
						}, {
							value: 'time-picker',
							label: 'TimePicker 时间选择器'
						}, {
							value: 'date-picker',
							label: 'DatePicker 日期选择器'
						}, {
							value: 'datetime-picker',
							label: 'DateTimePicker 日期时间选择器'
						}, {
							value: 'upload',
							label: 'Upload 上传'
						}, {
							value: 'rate',
							label: 'Rate 评分'
						}, {
							value: 'form',
							label: 'Form 表单'
						}]
					}, {
						value: 'data',
						label: 'Data',
						children: [{
							value: 'table',
							label: 'Table 表格'
						}, {
							value: 'tag',
							label: 'Tag 标签'
						}, {
							value: 'progress',
							label: 'Progress 进度条'
						}, {
							value: 'tree',
							label: 'Tree 树形控件'
						}, {
							value: 'pagination',
							label: 'Pagination 分页'
						}, {
							value: 'badge',
							label: 'Badge 标记'
						}]
					}, {
						value: 'notice',
						label: 'Notice',
						children: [{
							value: 'alert',
							label: 'Alert 警告'
						}, {
							value: 'loading',
							label: 'Loading 加载'
						}, {
							value: 'message',
							label: 'Message 消息提示'
						}, {
							value: 'message-box',
							label: 'MessageBox 弹框'
						}, {
							value: 'notification',
							label: 'Notification 通知'
						}]
					}, {
						value: 'navigation',
						label: 'Navigation',
						children: [{
							value: 'menu',
							label: 'NavMenu 导航菜单'
						}, {
							value: 'tabs',
							label: 'Tabs 标签页'
						}, {
							value: 'breadcrumb',
							label: 'Breadcrumb 面包屑'
						}, {
							value: 'dropdown',
							label: 'Dropdown 下拉菜单'
						}, {
							value: 'steps',
							label: 'Steps 步骤条'
						}]
					}, {
						value: 'others',
						label: 'Others',
						children: [{
							value: 'dialog',
							label: 'Dialog 对话框'
						}, {
							value: 'tooltip',
							label: 'Tooltip 文字提示'
						}, {
							value: 'popover',
							label: 'Popover 弹出框'
						}, {
							value: 'card',
							label: 'Card 卡片'
						}, {
							value: 'carousel',
							label: 'Carousel 走马灯'
						}, {
							value: 'collapse',
							label: 'Collapse 折叠面板'
						}]
					}]
				}, {
					value: 'ziyuan',
					label: '资源',
					children: [{
						value: 'axure',
						label: 'Axure Components'
					}, {
						value: 'sketch',
						label: 'Sketch Templates'
					}, {
						value: 'jiaohu',
						label: '组件交互文档'
					}]
				}]
			}
		},
		methods: {
			//加载数据
			handleClick(tab, event) {
				console.log(tab, event);
				this.tabIndex = tab.index
			},
		}
	}
</script>

<style scoped>
	.shop_create .el-form-item{
		margin-bottom: 15px;
	}
</style>
