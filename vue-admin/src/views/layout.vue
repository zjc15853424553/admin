<template>
	<div>
		<!-- 主布局 -->
		<el-container style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;overflow: hidden;">
		  <el-header class="d-flex align-items-center" style="background: #545c64;">
			  <a class="h5 text-light mb-0 mr-auto">UNI-ADMIN</a>
			  <el-menu
			    :default-active="navBar.active"
			    mode="horizontal"
			    @select="handleSelect"
			    background-color="#545c64"
			    text-color="#fff"
			    active-text-color="#ffd04b">
				<!-- 遍历循环头部导航name -->
			    <el-menu-item :index="index.toString" v-for="(item,index) in navBar.list" :key="index">{{item.name}}</el-menu-item>
				<el-submenu index="6">
				    <template slot="title">
						<el-avatar size="small" class="mr-2" src="http://thirdwx.qlogo.cn/mmopen/vi_32/EdGbV0OQuYdZkdoRHThG2WviaQNsYZCmc89vgzfdibeiaXic7RfKpMYcticsHSu6DTvYNzCF69bqeI6vNEibBExUKFDw/132"></el-avatar>summer
					</template>
				    <el-menu-item index="6-1">修改</el-menu-item>
				    <el-menu-item index="6-2">退出</el-menu-item>
				 </el-submenu>
			  </el-menu>
		  </el-header>
			  <el-container style="height: 100%;padding-bottom: 60px;">
				<el-aside width="200px">
					<el-menu default-active="2">
					  <el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					  </el-menu-item>
					  <el-menu-item index="3">
						<i class="el-icon-document"></i>
						<span slot="title">导航三</span>
					  </el-menu-item>
					  <el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					  </el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
					<li v-for="i in 100" :key="i">{{i}}</li>
				</el-main>
			  </el-container>
		</el-container>
		 <!-- <router-view/> -->
	</div>
</template>
<script>
	export default{
		data(){
			return{
				navBar:{
					active:'1',
					list:[
						{name:'首页'},
						{name:'商品'},
						{name:'订单'},
						{name:'会员'},
						{name:'设置'}]
				}
			}
		},
		 methods: {
		      handleSelect(key, keyPath) {
		        console.log(key, keyPath);
		      }
		    }
	}
</script>
<style scoped lang="less">
	
</style>