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
				  <el-button type="warning" v-if="chooseList.length > 0" size="mini" @click="unChoose">取消选中</el-button>
				  <el-button type="danger" v-if="chooseList.length > 0" size="mini" @click="imageDel({all:true})">批量删除</el-button>
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
				  	<el-col :span="24" :lg="4" :md="6" :sm="8" v-for="(item,index) in imageList" :key="index" class="mb-3">
						<el-card style="cursor: pointer;" class="box-card position-relative" shadow="hover" :body-style="{'padding':'0'}">
							<div class="border" :class="{'border-danger':item.checked}">
								<span class="badge badge-danger" v-if="item.checked" style="position: absolute;right: 0;top: 0;">{{item.checkOrder}}</span>
								<img :src="item.url" alt="" class="w-100" style="height:100px;" @click="ischecked(item)">
								<div class="w-100 text-white pl-2" style="background: rgba(0,0,0,0.5);margin-top: -25px;position: absolute;">
								<span class="small">{{item.name}}</span> 
								</div>
								<div class="p-2 text-center">
									<el-button-group>
									  <el-button size="mini" icon="el-icon-view" @click="previewImage(item)"></el-button>
									  <el-button size="mini" icon="el-icon-share" @click="imageEdit(item,index)"></el-button>
									  <el-button size="mini" icon="el-icon-delete" @click="imageDel({index})"></el-button>
									</el-button-group>
								</div>
							</div>
						</el-card>
					</el-col>
				  </el-row>
			  </el-main>
		    </el-container>
		  </el-container>
		  <!-- 底部显示内容区域 -->
		  <el-footer class="border-top d-flex align-items-center px-0">
			  <!-- 左侧的分页 -->
			  <div style="width: 200px;flex-shrink: 0;" class="h-100 d-flex align-items-center justify-content-center border-right">
				  <el-button size="mini">上一页</el-button>
				  <el-button size="mini">下一页</el-button>
			  </div>
			  <!-- 右边的分页 -->
			  <div class="d-flex px-2">
				  <el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[100, 200, 300, 400]"
						:page-size="100"
						layout="total, sizes, prev, pager, next, jumper"
						:total="400">
				  </el-pagination>
			  </div>
		  </el-footer>
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
		<!-- 预览图片 -->
		<el-dialog :visible.sync="previewModel" width=60vw top=5vh>
			<div style="margin: -60px -20px -30px -20px;">
				<img :src="previewUrl" alt="" class="w-100">
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
				albumModel:false, //控制修改图片模态框显示隐藏
				uplodeModel:false, //控制上传图片模态框显示隐藏
				previewModel:false,  //控制预览图片模态框显示隐藏
				albumEditIndex:-1,//当不为-1的时候表示的是修改相册列表，大于-1的时候表示创建相册
				albumForm:{ //模态框的对象
					name:"",
					order:0
				},
				albumsIndex:0,//相册列表的index
				albums:[],//相册数据
				previewUrl:'',
				imageList:[], //存放图片数据
				chooseList:[],//选中图片存储数据的地方
				currentPage:1,
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
			//取消选中
			unChoose(){
				//便利数组
				this.imageList.forEach(img=>{
				let i = this.chooseList.findIndex(item=>{
						return item.id === img.id
					})
					//取消选中样式
					if(i > -1){
						 img.checked = false;
						 //排序归零
						 img.checkOrder = 0;
						 //删除选中的图片数据
						 this.chooseList.splice(i,1)
					}
				})
			},
			//分页点击事件
			 handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			  },
			  handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			  },
			//渲染相册列表
			init(){
				for(var i = 0 ; i < 20 ; i++){
					this.albums.push({
						name:'相册'+i,
						num:Math.floor(Math.random()*100),
						order:0
					})
				}
				for(var i = 0; i < 30; i++){
					this.imageList.push({
						id:i,
						url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3243951112,1480450162&fm=26&gp=0.jpg',
						name:'图片'+i,
						checkOrder:0,
						checked:false
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
				//修改相册逻辑
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
			},
			//预览图片点击事件
			previewImage(item){
				this.previewUrl = item.url;
				this.previewModel = true;
			},
			//编辑相册修改名称
			imageEdit(item,index){
				console.log(item,index)
				this.$prompt('请输入新名称', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  inputValue:item.name,
					  inputValidator(val){
						  //判断val是否为空，空就return
						  if(val === ''){
							  return '图片名称不能为空'
						  }
					  }
					}).then(({ value }) => {
						item.name = value;
					  this.$message({
						type: 'success',
						message: '图片名称修改成功'
					  });
					})
			},
			//图片点击时间显示边框以及右上角的数字下标
			ischecked(item){
				//未选中状态
				if(!item.checked){
					//加入选中
					this.chooseList.push({id:item.id,url:item.url})
					// 计算顺序
					item.checkOrder = this.chooseList.length;
					//改变当前的状态
					item.checked = true;
					return;
				}
				//取消选中
				//先找到在chooseList中的索引
				let i = this.chooseList.findIndex(v=>v.id == item.id)
				//重新计算序号
				let length = this.chooseList.length;
				//取消选中部分
				if(i+1 < length){//当i+1小于chooseList长度的时候表示选中的是中间的
					for(var j = i; j< length; j++){
						//数据存储数组和选中存储数组中是否有相同id
						let no = this.imageList.findIndex(v => v.id === this.chooseList[j].id)
						if(no > -1){
						//对后面的序号重新进行计算
						this.imageList[no].checkOrder--	
						}
					}
				}
				//删除
				this.chooseList.splice(i,1)
				//改变状态
				item.checked = false;
				//改变初始值checkOrder
				item.checkOrder = 0;
			},
			//删除当前的图片//批量删除代码合并 通过obj传达参数来判断 all：true 走批量删除代码否则走单个删除代码
			imageDel(obj){
				this.$confirm(obj.all?'是否删除选中图片':'是否删除该图片', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					if(obj.all){
						let list = this.imageList.filter(img=>{
							return !this.chooseList.some(c=>{
								return c.id == img.id
							})
						})
						this.imageList  = list;
						this.chooseList = [];
					}
					else{
						 this.imageList.splice(obj.index,1)
					}
				  this.$message({
					type: 'success',
					message: '删除成功!'
				  });
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
		}
	}
</script>

<style scoped>
	
</style>
