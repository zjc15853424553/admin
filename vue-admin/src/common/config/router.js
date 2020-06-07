let routes = [
    {
      path: '/',
      name: 'layout',
	  redirect:{name:'index'},
      component:'layout',
	  children:[
	     {
			 path:'/index',
			 name:'index',
			 component:'index/index'
		 }
	  ]
    },
	{
		path:'/login',
		name:'login',
		component: 'login/index'
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
		  console.log('123123',arr[i])
		  if(!arr[i].component) return 
		  let componentFun = import(`../../views/${arr[i].component}.vue`);
		  arr[i].component = () => componentFun;
		  if(arr[i].children && arr[i].children.length > 0){
			  createRouter(arr[i].children)
		  }
	  }
  }
  export default getRoutes()