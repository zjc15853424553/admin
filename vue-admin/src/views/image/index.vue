<template>
	<div>
		<el-container style="position: absolute;left: 0;right: 0;bottom: 0;top: 55px;">
			<!-- 头部 -->
		  <el-header class="d-flex align-items-center border-bottom" style="justify-content: space-between;">
			  <div class="d-flex align-items-center">
				  <el-select placeholder="请选择活动区域" size="mini" v-model="searchForm.order" class="mr-2" style="width: 150px;">
				      <el-option  label="上海" value="上海"></el-option>
					  <el-option  label="北京" value="北京"></el-option>
				  </el-select>
				  <el-input placeholder="请输入内容" size="mini"  style="width: 150px;" class="mr-2" v-model="searchForm.keyword"></el-input>
				  <el-button type="success"  size="mini">搜索</el-button>
			  </div>
			  <div class="d-flex align-items-center">
				  <el-button type="success" size="mini">创建相册</el-button>
				  <el-button type="warning" size="mini">上传图片</el-button>
			  </div>
		  </el-header>
		  <!-- 中间内容 -->
		  <el-container>
			  <!-- 侧边栏 -->
		    <el-aside width="200px" style="position: absolute;top: 60px;bottom: 60px;left: 0;">
				<ul class="list-group">
					<li class="list-group-item list-group-item-active d-flex align-items-center" style="cursor: pointer;" v-for="(item,index) in albums" :key="index" @click.stop="albumsChange(index)" :class="{'active sum-active': albumsIndex === index?true:false}">
						{{item.name}}
						<el-dropdown class="ml-auto">
						  <span class="btn btn-light btn-sm border">
						    {{item.num}}<i class="el-icon-arrow-down el-icon--right"></i>
						  </span>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item  @click.stop.native="albumEdit(index)">修改</el-dropdown-item>
						    <el-dropdown-item  @click.stop.native="albumDel(index)">删除</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</li>
				</ul>
			</el-aside>
			<!-- 中间右边相册列表显示 -->
		    <el-container>
		      <el-main style="position: absolute;left: 200px;right: 0;top: 60px;bottom: 60px;">
				  <!-- 主要内容 -->
				  主要内容
			  </el-main>
		    </el-container>
		  </el-container>
		  <!-- 底部显示内容区域 -->
		  <el-footer>Footer</el-footer>
		</el-container>
		
		<!-- 修改或者创建相册弹出表单封装 -->
		<el-dialog title="修改相册" :visible.sync="albumModel">
			<el-form ref="form" :model="albumForm" label-width="80px">
			  <el-form-item label="相册名称">
			    <el-input v-model="albumForm.name" placeholder="请输入相册名称"></el-input>
			  </el-form-item>
			  <el-form-item label="相册排序">
				   <el-input-number v-model="albumForm.order" :min="0"></el-input-number>
			  </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="albumModel = false">取消</el-button>
				<el-button type="primary" @click="albumModel = false">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				searchForm:{
					order:"desc",
					keyword:""
				},
				albumModel:false,
				albumForm:{
					name:"",
					order:0
				},
				albumsIndex:0,
				albums:[]
			}
		},
		created(){
			this.init()
		},
		methods:{
			init(){
				for(var i = 0 ; i < 20 ; i++){
					this.albums.push({
						name:'相册'+i,
						num:Math.floor(Math.random()*100),
						order:0
					})
				}
			},
			// 相册点击事件
			albumsChange(index){
				this.albumsIndex = index;
			},
			
			// 修改相册
			albumEdit(index){
				
			},
			// 删除某一个相册
			albumDel(index){
			   this.$confirm('是否删除该相册?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.albums.splice(index,1)
					  this.$message({
						type: 'success',
						message: '删除成功!'
					  });
				})	
			}
		}
	}
</script>

<style scoped="">
	.sum-active{
		color: #67c23a !important;
		background-color: #f0f9eb !important;
		border-color: #c2e7b0 !important;
	}
</style>
