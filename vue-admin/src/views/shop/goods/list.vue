<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
		    <el-tab-pane :label="item.name" v-for="(item,index) in tabbars" :key="index">
				<!-- 引入封装组件 -->
				<button-search ref="buttonSearch" placeholder="请输入商品名称" @search="searchEvent">
					<template #left>
						<el-button type="success" size="mini">发布商品</el-button>
						<el-button type="danger" size="mini">批量删除</el-button>
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
			}
		},
		methods:{
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
