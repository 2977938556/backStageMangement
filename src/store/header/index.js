export default {
  namespaced: true,
  state: {
    tab: false,// 
    crumbs: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ]
  },
  mutations: {
    NEGATE(state) {
      state.tab = !state.tab
    },

    // 添加数据
    CRUMBS(state, value) {
      // 判断当前是否有数据 如果没有数据那么就不会添加否则就会添加数据
      let s = state.crumbs.some(item => {
        return item.name == value.name
      })
      if (s == false) {
        state.crumbs.push(value)
      }
    },

    DELETECRUMBS(state, value) {

      // 查询元素位置并删除
      let index = state.crumbs.findIndex(val => {
        return val.name == value.name;
      })
      state.crumbs.splice(index,1);
      
    }


  },
  actions: {



    // 设置显示隐藏侧边栏
    ShowMenu({ commit }) {
      commit("NEGATE")
    },
    // 添加面包屑
    CruMbs({ commit }, data) {
      // if ()
      commit("CRUMBS", data)
    },
    //删除面包屑
    DeleteCrumbs({ commit }, data) {
      commit("DELETECRUMBS", data)
    }







  },
  getters: {}
}