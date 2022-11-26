<template>
  <div class="login">

    <el-form ref="form" :model="form" label-width="80px" label-position="left" :rules="rules" :status-icon="true">
      <el-form-item>
        <h1>登录</h1>
      </el-form-item>
      <el-form-item label="账户名称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="denglu">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Mock from 'mockjs'
import { LoginList } from '@/api'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: '请输入您的账户名名称', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入的的密码', trigger: 'blur' }
        ]
      }


    }
  },
  methods: {
    ...mapActions('header', ["AddMenu", "DynamicRouter"]),
    ...mapMutations('header', ["CLEARTAG"]),



    denglu() {
      this.$refs.form.validate((a, b) => {
        //这里判断是否为真
        if (a == true) {

          // 这里将账户的数据传递过去并进行后端判断
          LoginList(this.form).then(res => {

            //  这里是判断用户错误登录错误的情况
            if (res.code != 20000) {
              this.$message({
                message: res.data.message,
                type: 'warning'
              });

              return false;
            } else {


              // 需要生成tokne 并且保存到到cookies
              let token = Mock.Random.guid();
              Cookies.set("token", token)

              // 获取用户的menu菜单数据 保存到store仓库中
              this.AddMenu(res.data.menu);

              // 要动态生成路由
              this.DynamicRouter(this.$router)



              // 初始化tag面包屑
              this.CLEARTAG([{
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              }])


              // 提示成功s
              this.$message({
                message: "登录成功欢迎你",
                type: 'success'
              });


              // 这里是成功的状态跳转路由页面
              this.$router.push({ name: "home" })



              // 


            }





          })


        }




      })
    }
  }
}





</script>



<style scoped lang="less">
.login {
  width: 400px;
  height: 300px;
  background: rgb(231, 231, 231);
  padding: 30px;
  margin: 180px auto;
  box-shadow: 1px 1px 20px 0px #6e6e6e;
  border-radius: 20px;

}
</style>

