<template>
	<div>
		<li class="list-group-item list-group-item-active d-flex align-items-center" style="cursor: pointer;"@click.stop="$emit('Change',index)" :class="{'active sum-active': active}">
			{{item.name}}
			<el-dropdown class="ml-auto">
			  <span class="btn btn-light btn-sm border">
			    {{item.num}}<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item  @click.stop.native="$emit('edit',{item,index})">修改</el-dropdown-item>
			    <el-dropdown-item  @click.stop.native="$emit('del',index)">删除</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</li>
	</div>
</template>

<script>
	export default{
		props:{
			active:{
				type:Boolean,
				default:false
			},
			index:Number,
			item:{
				type:Object,
				default:()=>{}
			},
		}
	}
</script>

<style scoped>
	.sum-active{
		color: #67c23a !important;
		background-color: #f0f9eb !important;
		border-color: #c2e7b0 !important;
	}
</style>
