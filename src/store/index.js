import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入数据小仓库
import header from '@/store/header'





export default new Vuex.Store({
  modules: {
    header
  }
})