<template>
  <div id="Menu">
    <el-row class="tac">
      <el-menu default-active="2" class="el-menu-vertical-demo" :collapse-transition="false" :collapse="tab"
        :unique-opened="true" :router="true" background-color="#545c64" text-color="#fff">
        <h3 class="title">{{ tab ? "后台" : "后台管理系统" }}</h3>
        <!--  一级菜单 -->
        <!-- :class="{ colorA: $route.name == item.name }" -->
        <el-menu-item @click="clickMenu(item)" :index="item.name" v-for="(item) in menuContain" :key="item.name">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <!--  二级菜单 -->
        <el-submenu index="" v-for="item in menuNo" :key="item.label">
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span>{{ item.label }}</span>
          </template>

          <el-menu-item-group v-for="items in item.children" :key="items.name">
            <el-menu-item @click="clickMenu(items)" :index="items.name">{{ items.label }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-row>
  </div>
</template>

<script>


import { mapState, mapActions } from 'vuex'
import Cookies from "js-cookie"



export default {

  data() {
    return {
      // 控制展开还是显示
      iscollapse: false,
      active: false,
      // 菜单数据
      menuList: [],
    }
  },

  // 计算属性
  computed: {
    ...mapState('header', ["tab", "menu"]),
    //01 计算出是否有二级菜单
    menuContain() {
      return this.menuList.filter(item => !item.children)
    },
    //02 计算出有二级菜单的数据=
    menuNo() {
      return this.menuList.filter(item => item.children)
    }
  },

  // 获取数据
  methods: {
    ...mapActions('header', ["CruMbs"]),

    // 设置防止重复点击数据
    clickMenu(item) {
      // 这里是防止路由重复跳转
      if (item.name != this.$router.name && !(this.$router.path == "/home" && (item.path == "/"))) {
        this.$router.push(item.path)
      };

      // 添加面包屑
      this.CruMbs(item)



    },
  },



  mounted() {
    // 这里是判断没有菜单数据
    if (!Cookies.get("menu")) {
      this.menuList = this.menu;
    } else {
      this.menuList = JSON.parse(Cookies.get("menu"))
    }
  }
}




</script>

<style lang="less" scoped>
.colorA {
  color: rgb(255, 208, 75) !important;

  // background-color: rgb(85, 112, 139) !important;
  /deep/.el-menu-item.is-active {
    color: red !important;
  }

  i {
    color: rgb(255, 208, 75) !important;
  }
}

#Menu {
  height: 100vh;
  background: red;
}



.tac {

  background: red;
}

.el-menu {
  height: 100vh;
  text-align: left;
  border-right: 0px;
  background: red;
  border: none;
  // padding:10px;
  // margin:0px;
  // overflow: hidden;

}

.el-menu-item {
  min-width: 0px;
}

/deep/.title {
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #fff !important;
  // margin: 10px 50px 10px 50px;
}
</style>