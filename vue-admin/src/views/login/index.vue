<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5" >
				<div class="card md-5">
					<div class="card-header bg-white">
						<h3 class="text-center mb-0 text-secondary">UNI-ADMIN</h3>
					</div>
					<div class="card-body">
						<el-form ref="ruleForm" :model="form" :rules="rules">
							<el-form-item prop="username">
								<el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
							</el-form-item>
							<el-form-item prop="password">
								<el-input type="password" v-model="form.password" size="medium" placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class="w-100" type="primary" size="medium" @click="submit">登录</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div class="card-footer mt-3 pb-2 text-center text-success">底部</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				//表单信息
				form:{
					username:'',
					password:''
				},
				//验证规则
				rules:{ //required 表示是否是必填项 message：表示提示信息  trigger：表示的是什么时候做判断 blue失去焦点
					username:[{required:true,message:'请输入用户名',trigger:'blur'}],
					password:[{required:true,message:'请输入密码',trigger:'blur'}]
				}
			}
		},
		methods:{
			//点击登录事件
			submit(){
				this.$refs.ruleForm.validate((e)=>{
					console.log(e)
					if(!e) return
					//登陆成功进行跳转页面
					this.$router.push({name:'index'})
				})
			}
		}
	}
</script>

<style>
</style>
