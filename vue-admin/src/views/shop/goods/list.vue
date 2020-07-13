<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
		    <el-tab-pane :label="item.name" v-for="(item,index) in tabbars" :key="index">
				<div class="d-flex align-items-center pb-3">
					<el-button type="success" size="mini">发布商品</el-button>
					<el-button type="danger" size="mini">批量删除</el-button>
					<div class="d-flex align-items-center ml-auto">
						<el-input class="mr-2" v-model="form.keyword" placeholder="要搜索的商品名称" size="mini" style="width: 150px;"></el-input>
						<el-button type="info" size="mini">搜索</el-button>
						<el-button size="mini">高级搜索</el-button>
					</div>
				</div>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>卡片名称</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<div class="text item"></div>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tabIndex:0,
				form:{
					keyword:''
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
			 handleClick(tab, event) {
			        console.log(tab, event);
			      }
		}
	}
</script>

<style>
</style>
