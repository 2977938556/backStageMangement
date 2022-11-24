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
import Home from '@/views/home'
import User from '@/views/user'
import Mall from '@/views/mall'
import PageOne from '@/views/pageone'
import PageTow from '@/views/pagetow'







let routes = [
  {
    path: "/", component: Main,
    redirect: 'home',
    children: [
      { path: "home", name: "home", component: Home },//首页
      { path: "user", name: "user", component: User },//用户
      { path: "mall", name: "mall", component: Mall },//产品管理
      { path: "PageOne", name: "PageOne", component: PageOne },//页面1
      { path: "PageTow", name: "PageTow", component: PageTow },//页面2
    ]

  }

];


let router = new VueRouter({
  routes
})



export default router