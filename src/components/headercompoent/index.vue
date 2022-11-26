<template>
  <div class="Header-conter">
    <!-- 按钮区域 -->
    <div class="left-header">
      <el-button icon="el-icon-menu" size="medium" @click="ShowMenu()"></el-button>


      <el-breadcrumb separator="/">
        <el-breadcrumb-item :class="{ active: $route.name == item.name }" v-for="item in crumbs" :key="item.name"
          :to="{ name: `${item.name}` }">{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>


    </div>

    <!-- 头像区域 -->
    <div class="right-header">
      <!-- <span>
        <a href="#">
          <img src="https://img0.baidu.com/it/u=3999902432,1558470863&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt="">
        </a>
      </span> -->
      <el-dropdown trigger="click" :show-timeout="100" @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="https://img2.baidu.com/it/u=2360330494,1092108791&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-circle-check">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-plus" size="mini" command="auto"> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>


<script>

import { mapActions, mapState } from 'vuex'
import Cookies from 'js-cookie'







export default {
  name: "Header",

  methods: {
    ...mapActions('header', ["ShowMenu"]),
    handleCommand(e) {
      if (e == "auto") {
        Cookies.remove("token");//删除token
        Cookies.remove("menu");//删除菜单数据
        this.$router.push('/login')// 跳转路由到登录页
        window.location.reload();
      }

    }
  },
  computed: {
    ...mapState('header', ["crumbs"])
  }





}


</script>


<style lang='less' scoped>
* {
  padding: 0;
  margin: 0;
}


.active {
  cursor: pointer;

  /deep/ .el-breadcrumb__inner {
    transition: all 0.5s;
    font-size: 24px;
    color: rgb(255, 255, 255) !important;

  }

}


// 左侧内容
.Header-conter {
  width: 100%;
  height: 60px;
  display: flex;
  // justify-content: space-between;
  justify-content: space-between;
  align-items: center;
  background: #333;
}


.left-header {
  display: flex;
  // border: 1px solid red;
  align-items: center;
  color: #fff;

  button {
    margin: 10px;
    font-size: 38px;
  }
}


// 处理头像
.right-header {
  // border: 1px solid red;

  span {
    display: block;
    width: 40px;
    height: 40px;
    background: rgb(206, 206, 206);
    border-radius: 100px;
    overflow: hidden;
    cursor: pointer;
    margin: 20px 50px 20px 20px;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

}






.el-breadcrumb {
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;

      &.is-link {
        cursor: pointer;
        color: rgb(150, 150, 150);
      }
    }

    /deep/&:last-child {
      .el-breadcrumb__inner {
        color: rgb(255, 255, 255);
      }
    }


  }
}
</style>