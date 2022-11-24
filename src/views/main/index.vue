<template>
  <div id="Main">
    <!--  容器 -->
    <el-container>
      <!-- 菜单区域  -->
      <el-aside width="auto">
        <MenuComponent></MenuComponent>
      </el-aside>
      <el-container>

        <!-- 头部区域 -->
        <el-header>
          <HeaderComponent></HeaderComponent>
        </el-header>
        <TageComponents></TageComponents>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>


  </div>
</template>


<script>

// 导入组件
import MenuComponent from '@/components/menucomponent'// 右侧菜单组件
import HeaderComponent from '@/components/headercompoent' // 头部区域
import TageComponents from '@/components/tagecomponents'; // 面包屑


export default {
  name: "M-ain",


  components: {
    MenuComponent,
    HeaderComponent,
    TageComponents,
  }






}


</script>


<style scoped>
* {
  padding: 0;
  margin: 0;
}

.el-main {
  height: 100%;
  width: 100%;
  /* border: 5px solid red; */

}
</style>




