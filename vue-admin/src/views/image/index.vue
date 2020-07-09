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
				  <el-button type="success" size="mini" @click="openAlbumModel(false)">创建相册</el-button>
				  <el-button type="warning" size="mini" @click="uplodeModel = true">上传图片</el-button>
			  </div>
		  </el-header>
		  <!-- 中间内容 -->
		  <el-container>
			  <!-- 侧边栏 -->
		    <el-aside width="200px" style="position: absolute;top: 60px;bottom: 60px;left: 0;">
				<ul class="list-group">
					<!-- 引用image封装组件 -->
					<album-item @Change="albumsChange" @edit="openAlbumModel" @del="albumDel" v-for="(item,index) in albums" :key="index" :index="index" :item="item" :active="albumsIndex === index"></album-item>
				</ul>
			</el-aside>
			<!-- 中间右边相册列表显示 -->
		    <el-container>
		      <el-main style="position: absolute;left: 200px;right: 0;top: 60px;bottom: 60px;">
				  <!-- 主要内容 -->
				  <el-row :gutter="10">
				  	<el-col :span="24" :lg="4" :md="6" :sm="8" v-for="(item,index) in 10" :key="index" class="mb-3">
						<el-card style="cursor: pointer;" class="box-card position-relative" shadow="hover" :body-style="{'padding':'0'}">
							<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3243951112,1480450162&fm=26&gp=0.jpg" alt="" class="w-100" style="height:100px;">
							<div class="w-100 text-white" style="background: rgba(0,0,0,0.5);margin-top: -25px;position: absolute;">12345</div>
							<div class="p-2 text-center">
								<el-button-group>
								  <el-button size="mini" icon="el-icon-edit"></el-button>
								  <el-button size="mini" icon="el-icon-share"></el-button>
								  <el-button size="mini" icon="el-icon-delete"></el-button>
								</el-button-group>
							</div>
						</el-card>
					</el-col>
				  </el-row>
			  </el-main>
		    </el-container>
		  </el-container>
		  <!-- 底部显示内容区域 -->
		  <el-footer>Footer</el-footer>
		</el-container>
		
		<!-- 修改或者创建相册弹出表单封装 -->
		<el-dialog :title="albumModelTitle" :visible.sync="albumModel">
			<el-form ref="form" :model="albumForm" label-width="80px">
			  <el-form-item label="相册名称">
			    <el-input v-model="albumForm.name" placeholder="请输入相册名称" size="medium"></el-input>
			  </el-form-item>
			  <el-form-item label="相册排序">
				   <el-input-number v-model="albumForm.order" :min="0" size="medium"></el-input-number>
			  </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="albumModel = false">取消</el-button>
				<el-button type="primary" @click="confirmAlbumModel">确定</el-button>
			</div>
		</el-dialog>
		<!-- 上传图片 -->
		<el-dialog title="上传图片" :visible.sync="uplodeModel">
			<div class="text-center">
				<el-upload
					  class="upload-demo w-100"
					  drag
					  action="https://jsonplaceholder.typicode.com/posts/"
					  multiple>
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</div>
			
		</el-dialog>
	</div>
</template>

<script>
	import albumItem from '../../components/image/album-item.vue'
	export default{
		data(){
			return{
				searchForm:{
					order:"desc",
					keyword:""
				},
				albumModel:false,
				uplodeModel:false,
				albumEditIndex:-1,
				albumForm:{
					name:"",
					order:0
				},
				albumsIndex:0,
				albums:[]
			}
		},
		computed:{
			albumModelTitle(){
				return this.albumEditIndex > -1?'修改相册':'创建相册'
			}
		},
		components:{
			albumItem
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
			// 修改相册或者创建相册
			// 这里由于修改和创建相册用的是同一个，所以创建的时候需要传入参数false
			openAlbumModel(obj){
				console.log(obj,'123123123')
				if(obj){
					// 解构赋值
					let { item,index } = obj;
					this.albumForm.name = item.name;
					this.albumForm.order = item.order;
					this.albumEditIndex = index;
					return	this.albumModel = true;
				}
				// 创建相册逻辑
				this.albumForm = {
					name:'',
					order:0
				}
				this.albumEditIndex = -1;
				this.albumModel = true;
			},
			// 点击确定修改/创建相册
			confirmAlbumModel(){
				// 判断是否为修改==>修改进行的代码逻辑
				if(this.albumEditIndex > -1){
					this.albumEdit()
					return this.albumModel = false;
				}
				// 创建相册往数组albums中追加 unshift
				this.albums.unshift({
					name:this.albumForm.name,
					order:this.albumForm.order,
					num:0
				})
				this.albumModel = false;
			},
			// 修改相册
			albumEdit(){
				this.albums[this.albumEditIndex].name = this.albumForm.name;
				this.albums[this.albumEditIndex].order = this.albumForm.order;
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

<style scoped>
	
</style>
