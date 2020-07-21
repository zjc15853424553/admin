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
			  <el-container style="height: 100%;">
				  <!-- 左侧菜单栏 -->
				<el-aside width="200px">
					<el-menu  background-color="#545c64"  text-color="#fff"
      active-text-color="#ffd04b" style="height: 100%;" :default-active="lefCurrentIndex"  @select="slideSelect">
					  <el-menu-item :index="index | numString" v-for="(item,index) in leftBarList" :key="index">
						<i :class="item.icon"></i>
						<span slot="title">{{item.name}}</span>
					  </el-menu-item>
					</el-menu>
				</el-aside>
				<!-- 右侧组件内容显示 -->
				<el-main class="bg-light" style="padding-bottom: 60px;position: relative;">
					<!-- 面包屑导航 -->
					<div style="padding: 20px;margin: -20px;" class="border-bottom mb-3 bg-white" v-if="Bran.length >0">
						<el-breadcrumb separator-class="el-icon-arrow-right">
						  <el-breadcrumb-item v-for="(item,index) in Bran" :key="index" :to="{ path: item.name }">{{item.title}}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					 <el-backtop target=".el-main" :bottom="100" :visibility-height='600'>
					    <div
					      style="{height: 100%;width: 100%; background-color: #f2f5f6;box-shadow: 0 0 6px rgba(0,0,0, .12);text-align: center;line-height: 40px;color: #1989fa;}">
					      UP
					    </div>
					  </el-backtop>
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
			this._initNavBar()
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
			//监听路由的改变再次触发这个方法，刷新这个组件
			'$route'(to,form){
				//点击面包屑导航后台首页时改变左边的状态循环遍历这个联动大数组，通过to.name去找到submenu里面的pathname，然后通过下标去赋值到navbar。active  lefCurrentIndex上。
				this.navBar.list.forEach((item,index)=>{
					let i = item.submenu.findIndex(v=>v.pathname === to.name)
					if(i!== -1){
						this.navBar.active = index.toString()
						this.lefCurrentIndex = i.toString()
					}
				})
				//监听路由改变的时候进行本地存储
				localStorage.setItem('navActive',JSON.stringify({
					top:this.navBar.active || '0',
					left:this.lefCurrentIndex || '0'
				}))
				this.getRouterBran()
			}
		},
		 methods: {
			 _initNavBar(){
				 let r = localStorage.getItem('navActive')
				 if(r){
					 r = JSON.parse(r)
					 this.navBar.active = r.top;
					 this.lefCurrentIndex = r.left;
				 }
			 },
			 //面包屑导航
			 getRouterBran(){
				//筛选出来带name值得路由
				let a = this.$route.matched.filter(v=>v.name)
				//定义一个空数组 
				let arr = [];
				//利用forEach进行循环 筛选出来除了首页之外的路由
				a.forEach((v,k)=>{
					//过滤掉layout和index，如果不是这两个进行push添加进数组中
					if(v.name === 'index' || v.name === 'layout') return
					arr.push({
						name:v.name,
						path:v.path,
						title:v.meta.title
					})
				})
				//判断arr数组的长度，如果长度大于0说明目前的路由不在首页，往数组最前面添加后台首页
				if(arr.length >0){
					arr.unshift({ name:'index',path:'/index',title:'后台首页' })
					}
				this.Bran = arr;
			 },
			 //头部菜单选中显示
		      handleSelect(key, keyPath) {
				if (key === '6-1') {
					return console.log('修改资料')
				}
				if (key === '6-2') {
					// 退出登录
					return console.log('退出登录')
				}
				this.navBar.active = key;
				this.lefCurrentIndex = '0'
				//当左侧菜单的长度大于0时进行下一步代码
				if(this.leftBarList.length > 0){
					//默认选择第一个
					this.$router.push({
						name:this.leftBarList[this.lefCurrentIndex].pathname
					})
				}
		      },
			  //左边菜单栏下标选中
			  slideSelect(key,keyPath){
				  console.log(key,'keykeykeykey')
				this.lefCurrentIndex = key;
				//这里点击侧边导航跳转到相对应的路由页面，需要拿到this.navBar.list[this.navBar.active].submenu[key].pathname;   路由跳转根据name来进行跳转 需要在config.js中每一个对象中添加对应的pathname
				let name = this.leftBarList[key].pathname;
				this.$router.push({name:name})
			  }
		    }
	}
</script>
<style scoped lang="less">
	
</style>