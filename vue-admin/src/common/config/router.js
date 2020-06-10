/*
规则：
1：例如：index/index, shop/goods/list 结尾以index为结尾的，默认去掉index
2： 
*/


let routes = [
    {
      path: '/',
      name: 'layout',
	  redirect:{name:'index'},
      component:'layout',
	  children:[
	     {
			 component:'index/index' //首页
		 },
		 {
			 component:'shop/goods/list' //商品列表
		 }
	  ]
    },
	{
		component: 'login/index' //登录页面
	},
	{
		path:'*',
		redirect:{name:'index'}
	}
  ]
  
  //获取路由信息方法
  let getRoutes = function(){
	  createRouter(routes) 
	  return routes
  }
  
  //自动生成路由  这里使用到了递归，如果有children的话就再次调用这个方法去循环遍历里面的路由
  function createRouter(arr){
	  for(let i=0;i < arr.length;i++){
		  if(!arr[i].component) return 
		  //生成index
		  let val = getval(arr[i].component);
		  //生成name
		  arr[i].name = arr[i].name || val.replace(/\//g,'_' );
		  //生成path
		  arr[i].path = arr[i].path ||  `/${val}`;
		  let componentFun = import(`../../views/${arr[i].component}.vue`);
		  arr[i].component = () => componentFun;
		  if(arr[i].children && arr[i].children.length > 0){
			  createRouter(arr[i].children)
		  }
	  }
  }
  //去除index
  function getval(str){
	  // str = login/index
	  //获取到最后一个‘/’的下标值
	  let index = str.lastIndexOf('/');
	  //截取‘/’后面 的值
	  let val = str.substring(index+1,str.length);
	  //判断最后面的值是不是index结尾的
	  if(val == 'index'){
		  return str.substring(index,-1)
	  }
	  return str
  }
  export default getRoutes()