<template>
	<div>
		<!-- 主布局 -->
		<el-container style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;overflow: hidden;">
		  <el-header class="d-flex align-items-center" style="background: #545c64;">
			  <a class="h5 text-light mb-0 mr-auto">{{this.$conf.login}}</a>
			  <!-- 头部右边菜单栏  default-active 默认绑定显示哪一个（index）-->
			  <el-menu
			    :default-active="navBar.active" 
			    mode="horizontal"
			    @select="handleSelect"
			    background-color="#545c64"
			    text-color="#fff"
			    active-text-color="#ffd04b">
				<!-- 遍历循环头部导航name -->
			    <el-menu-item :index="index | numString" v-for="(item,index) in navBar.list" :key="index">{{item.name}}</el-menu-item>
				<!-- 这是带下拉菜单的 -->
				<el-submenu index="6">
				    <template slot="title">
						<el-avatar size="small" class="mr-2" src="http://thirdwx.qlogo.cn/mmopen/vi_32/EdGbV0OQuYdZkdoRHThG2WviaQNsYZCmc89vgzfdibeiaXic7RfKpMYcticsHSu6DTvYNzCF69bqeI6vNEibBExUKFDw/132"></el-avatar>summer
					</template>
				    <el-menu-item index="6-1">修改</el-menu-item>
				    <el-menu-item index="6-2">退出</el-menu-item>
				 </el-submenu>
			  </el-menu>
		  </el-header>
		  <!-- 显示内容主体部分 -->
			  <el-container style="height: 100%;padding-bottom: 60px;">
				  <!-- 左侧菜单栏 -->
				<el-aside width="200px">
					<el-menu style="height: 100%;" :default-active="lefCurrentIndex" @select="slideSelect">
					  <el-menu-item :index="index | numString" v-for="(item,index) in leftBarList" :key="index">
						<i :class="item.icon"></i>
						<span slot="title">{{item.name}}</span>
					  </el-menu-item>
					</el-menu>
				</el-aside>
				<!-- 右侧组件内容显示 -->
				<el-main>
					<!-- 面包屑导航 -->
					<div style="padding: 20px;margin: -20px;" class="border-bottom" v-if="Bran.length >0">
						<el-breadcrumb separator-class="el-icon-arrow-right">
						  <el-breadcrumb-item v-for="(item,index) in Bran" :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<router-view/>
				</el-main>
			  </el-container>
		</el-container>
	</div>
</template>
<script>
	import common from '../common/mixins/common.js'
	export default{
		mixins:[common],
		data(){
			return{
				navBar:[],//该菜单进行了全局抽取
				Bran:[]
			}
		},
		created() {
			//进行菜单的初始化
			this.navBar = this.$conf.navBar;
			//开始就调用这个获取面包屑导航路由的方法
			this.getRouterBran()
		},
		computed:{
			//根据点击顶部的nav来决定显示那个submenu
			leftBarList(){
				return this.navBar.list[this.navBar.active].submenu || []
			},
			//计算左边菜单栏的index
			lefCurrentIndex:{
				get(){
					return this.navBar.list[this.navBar.active].subActive || '0'
				},
				set(val){
				    this.navBar.list[this.navBar.active].subActive = val;
				}
				
			}
		},
		watch:{
			//监听路由的改变再次触发这个方法，相遇刷新这个组件
			$route(to,form){
				this.getRouterBran()
			}
		},
		 methods: {
			 //面包屑导航
			 getRouterBran(){
			 	console.log(this.$route.matched)
				//筛选出来带name值得路由
				let a = this.$route.matched.filter(v=>v.name)
				//定义一个空数组
				let arr = [];
				//利用forEach进行循环 筛选出来除了首页之外的路由
				a.forEach((v,k)=>{
					//过滤掉layout和index，如果不是这两个进行push添加进数组中
					if(v.name == 'layout' || v.name == 'index') return
					arr.push({
						name:v.name,
						path:v.path,
						title:v.meta.title
					})
				})
				//判断arr数组的长度，如果长度大于0说明目前的路由不在首页，往数组最前面添加后台首页
				if(arr.length >0){
					arr.unshift({
						name:'index',
						path:'/index',
						title:'后台首页'
					})
				}
				this.Bran = arr;
				console.log(arr)
			 },
			 //头部菜单选中显示
		      handleSelect(key, keyPath) {
		        console.log(key, keyPath);
				this.navBar.active = key;
		      },
			  //左边菜单栏下标选中
			  slideSelect(key,keyPath){
				console.log(key, keyPath,'123123123');
				this.lefCurrentIndex = key;
				console.log(this.navBar.list[this.navBar.active],'oooooo')
				// this.$router.push({url})
			  }
		    }
	}
</script>
<style scoped lang="less">
	
</style>