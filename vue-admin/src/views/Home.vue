<template>
  <div class="home">
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
      <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'home',
  data(){
    return {
      activeName: 'second'
    }
  },
   methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style lang="less">

</style>
