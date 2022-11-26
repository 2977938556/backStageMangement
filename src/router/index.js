import Vue from 'vue'
import VueRouter from 'vue-router';



Vue.use(VueRouter);




// 防止路由重复跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}










//导入组件
import Main from '@/views/main'
// import Home from '@/views/main/home'
// import User from '@/views/main/user'
// import Mall from '@/views/main/mall'
// import PageOne from '@/views/main/pageone'
// import PageTow from '@/views/main/pagetow'

//登录组件
import Login from '@/views/login'



// 404页面
import Error from '@/views/error'







let routes = [
  {
    path: "/", component: Main,
    name: "main",
    redirect: 'home',
    children: [
      // { path: "home", name: "home", component: Home },//首页
      // { path: "user", name: "user", component: User },//用户
      // { path: "mall", name: "mall", component: Mall },//产品管理
      // { path: "page1", name: "page1", component: PageOne },//页面1
      // { path: "page2", name: "page2", component: PageTow },//页面2
    ]

  },
  { path: "/login", name: "login", component: Login },
  { path: "*", name: "error", component: Error },

];


let router = new VueRouter({
  routes
})



import Cookies from "js-cookie"
// 路由守卫
router.beforeEach((to, from, next) => {
  let token = Cookies.get('token');
  let menu = Cookies.get('menu');

  // /这里判断的是没有token[或者没有菜单选项] 并且当前页面不在登录页面 如果不加后面的判断会出现死循环
  if (!token && to.name != "login") {
    next('/login');

    // 这里判断 用户不在login 页面
  } else if (to.name != "login") {
    // menu菜单数据是否被用户手动删除 如果被删除了的话就清空token 并且跳转到登陆页面
    if (!menu) {
      Cookies.remove("token")
      next("/login")
    }
    next()
  } else if (token && to.name == "login") {
    //  这里是判断你有token 并且 当前页面再登录页面
    next('/home')
  } else {
    next()
  }

})



export default router