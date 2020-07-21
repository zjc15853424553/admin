<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
		    <el-tab-pane :label="item.name" v-for="(item,index) in tabbars" :key="index">
				<!-- 引入封装组件 -->
				<button-search ref="buttonSearch" placeholder="请输入商品名称" @search="searchEvent">
					<template #left>
						<el-button type="success" size="mini">发布商品</el-button>
						<el-button type="warning" size="mini">恢复商品</el-button>
						<el-button type="danger" size="mini">批量删除</el-button>
						<el-button size="mini">上架</el-button>
						<el-button size="mini">下架</el-button>
						<el-button size="mini">推荐</el-button>
					</template>
					<template #form>
						<!-- 表单 -->
						<el-form ref="form" inline :model="form" label-width="80px">
							<el-form-item label="商品名称" class="mb-0">
								<el-input v-model="form.name" size="mini" placeholder="请输入商品名称"></el-input>
							</el-form-item>
							<el-form-item label="商品编码" class="mb-0">
								<el-input v-model="form.code" size="mini" placeholder="请输入商品编码"></el-input>
							</el-form-item>
							<el-form-item label="商品类型" class="mb-0">
								<el-select v-model="form.type" size="mini" placeholder="请选择商品类型">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="商品分类" class="mb-0">
								<el-input v-model="form.category" size="mini" placeholder="请选择商品分类"></el-input>
							</el-form-item>
							<el-form-item class="mb-0">
								<el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
								<el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
							</el-form-item>
						</el-form>
					</template>
				</button-search>
				<!-- 表格 -->
				<el-table border class="mt-3 mb-3 pb-3" :data="tableData[index].list" style="width: 100%"  @selection-change="handleSelectionChange">
				  <el-table-column  type="selection"  width="45" align="center"> </el-table-column>
				  <el-table-column prop="title" label="商品" width="390" align="center">
					  <template slot-scope="scope">
						 <div class="media">
						    <img :src="scope.row.cover" style="width: 60px;height: 60px;" class="mr-2" alt="...">
						    <div class="media-body">
						      <p style="text-align: left;" class="mt-0 mb-1">{{scope.row.title}}</p>
							  <p style="text-align: left;" class="mb-1">分类：{{scope.row.category}}</p>
							  <p style="text-align: left;" class="mb-0">时间：{{scope.row.create_time}}</p>
						    </div>
						  </div>
					  </template>
				  </el-table-column>
				  <el-table-column prop="type" label="商品类型" align="center"></el-table-column>
				  <el-table-column prop="sale_count" label="商品销量" align="center"></el-table-column>
				  <el-table-column prop="order" label="商品排序" align="center"></el-table-column>
				  <el-table-column label="商品状态" align="center">
					  <template slot-scope="scope">
						  <el-button v-if="scope.row.status == 1" type="success" plain size="mini">上架</el-button>
						  <el-button v-if="scope.row.status == 0" type="warning" plain size="mini">下架</el-button>
					  </template>
				  </el-table-column>
				  <el-table-column prop="stock" label="总库存" align="center"></el-table-column>
				  <el-table-column prop="pprice" label="价格(元)" align="center"></el-table-column>
				  <el-table-column prop="address" label="操作" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import buttonSearch from '@/components/common/button-search.vue'
	export default{
		components:{
			buttonSearch
		},
		data(){
			return{
				tableData: [],
				// {
				// 	id:1,//商品id
				// 	title:'荣耀V10全网通 标配版 4GB+64GB 魅力红',//商品id
				// 	cover:'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',//商品图片
				// 	create_time:'2020-07-20 18:18:18',//商品时间
				// 	category:'手机',//商品分类
				// 	type:'普通商品',//商品id
				// 	sale_count:20,//商品销量
				// 	order:100,//排序
				// 	status:1,//商品状态
				// 	stock:200,//商品库存
				// 	pprice:1000,//商品价格
				// 	ischeck:1,//商品审核状态
				// 	//0 未审核 1 审核通过 2 不通过
				// }
				tabIndex:0,
				form:{
					name:'',
					code:'',
					type:'',
					category:''
				},
				tabbars:[
					{ name:"全部",key:"all"},
					{ name:"审核中",key:"checking"},
					{ name:"出售中",key:"saling"},
					{ name:"已下架",key:"off"},
					{ name:"库存预警" ,key:"min_stock"},
					{ name:"回收站" ,key:"delete"},
				],
				multipleSelection:[],//存放选中按钮的数据
			}
		},
		created() {
			this._getDate()
		},
		methods:{
			_getDate(){
				for( var i=0; i<this.tabbars.length; i++){
					this.tableData.push({
						currentPage:1,
						list:[]
					})
					for(var j =0; j<20; j++){
						this.tableData[i].list.push({
							id:j,//商品id
							title:'荣耀V10全网通 标配版 4GB+64GB 魅力红'+i+'-'+j,//商品id
							cover:'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',//商品图片
							create_time:'2020-07-20 18:18:18',//商品时间
							category:'手机',//商品分类
							type:'普通商品',//商品id
							sale_count:20,//商品销量
							order:100,//排序
							status:1,//商品状态
							stock:200,//商品库存
							pprice:1000,//商品价格
							ischeck:1,//商品审核状态
							//0 未审核 1 审核通过 2 不通过
						})
					}
				}
			},
			 handleSelectionChange(val) {
				 console.log(val,'valvalval')
				this.multipleSelection = val;
			  },
			//记载数据
			 handleClick(tab, event) {
				console.log(tab, event);
			  },
			  //搜索事件
			  searchEvent(e = false){
				  //简单搜索
				  if( typeof e === 'string'){
					  return console.log('简单搜索',e)
				  }
				  //高级搜索
				  console.log('高级搜索')
			  },
			  clearSearch(){
				  this.form = {
					 name:'',
					 code:'',
					 type:'',
					 category:'' 
				  }
				 this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
			  }
		}
	}
</script>

<style>
</style>
