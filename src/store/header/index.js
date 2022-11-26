import Cookies from "js-cookie"
import { importManager } from "less"

export default {
  namespaced: true,
  state: {
    tab: false,// 控制缩小菜单
    crumbs: [// 面包屑
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ],
    menu: [],
  },
  mutations: {

    //01 伸缩菜单 falsge
    NEGATE(state) {
      state.tab = !state.tab
    },

    //02 面包屑添加元素
    CRUMBS(state, value) {
      // 判断当前是否有数据 如果没有数据那么就不会添加否则就会添加数据
      let s = state.crumbs.some(item => {
        return item.name == value.name
      })
      if (s == false) {
        state.crumbs.push(value)
      }
    },

    //03 面包屑删除元素
    DELETECRUMBS(state, value) {

      // 查询元素位置并删除
      let index = state.crumbs.findIndex(val => {
        return val.name == value.name;
      })
      state.crumbs.splice(index, 1);

    },

    //04 获取menu不用账户不同数据
    ADDMENULIST(state, value) {
      state.menu = value || []
    },

    //05: 清空tag 标签中的数据
    CLEARTAG(state, value) {
      state.crumbs = value
    }




  },
  actions: {
    //01: 设置显示隐藏侧边栏
    ShowMenu({ commit }) {
      commit("NEGATE")
    },
    //02: 添加面包屑
    CruMbs({ commit }, data) {
      // if ()
      commit("CRUMBS", data)
    },
    //03: 删除面包屑
    DeleteCrumbs({ commit }, data) {
      commit("DELETECRUMBS", data)
    },
    //04: 用户登录成功获取menu菜单数据
    AddMenu({ commit }, data) {
      // 持久化存储
      Cookies.set("menu", JSON.stringify(data))
      commit("ADDMENULIST", data)
    },



    //05: 动态生成路由
    DynamicRouter({ commit }, router) {
      // 明天写了
      let menu = JSON.parse(Cookies.get("menu") || "[]");
      // 判断是否有menu菜单数据
      if (!menu) {
        return false
      }
      let PageMenu = [];

      // 遍历处理循环的数据
      menu.forEach(element => {
        // 判断是否有子路由
        if (element.children) {

          element.children = element.children.map(item => {
            item.component = () => import(`@/views/main/${item.name}/index.vue`)
            return item;
          })
          PageMenu.push(...element.children)


          // 
        } else {
          if (element.name == "login") {
            element.component = () => import(`@/views/login/index.vue`)
          } else {
            element.component = () => import(`@/views/main/${element.name}/index.vue`)
          }
          PageMenu.push(element)
        }
      });

      // 循环添加动态路由数据
      PageMenu.forEach(items => {
        router.addRoute("main", items)
      })




      // console.log(PageMenu)



    }









  },
  getters: {}
}