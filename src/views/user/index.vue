<template>
  <div id="User">
    <div class="add_input">

      <!-- 添加 - 搜索 区域 -->
      <div class="input-add-search">
        <div>
          <el-button @click="handerADD" class="addUser" type="primary" icon="el-icon-circle-plus-outline">添加用户
          </el-button>
        </div>

        <div>
          <el-form ref="form" :model="ruleForm" label-width="80px">
            <el-input v-model="ruleForm.name" placeholder="请输入你的搜索"></el-input>
          </el-form>
          <el-form>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form>
        </div>

      </div>

      <!-- 弹出框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <!-- 这里是放内容区域的 -->
        <!-- <div class=""></div> -->
        <el-form :model="ruleForm" @submit.native.prevent :rules="rules" :inline="true" ref="ruleForm"
          label-width="140px" class="demo-ruleForm" :show-message="true">

          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="出生日期" prop="birth">
            <el-date-picker v-model="ruleForm.birth" value-format="yyyy-M-d" type="date" placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>


          <el-form-item label="地址" prop="addr">
            <el-input v-model="ruleForm.addr" placeholder="请输入地址"></el-input>
          </el-form-item>


        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitData">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 表格数据 -->
      <div class="user-list">
        <el-table :data="userList" style="width: 98%" stripe>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="sex" label="性别" :formatter="chuliSex">
          </el-table-column>
          <el-table-column prop="age" label="年龄">
          </el-table-column>
          <el-table-column prop="birth" label="出生日期">
          </el-table-column>
          <el-table-column prop="addr" label="地址">
          </el-table-column>
          <el-table-column prop="addr" label="地址">
            <template slot-scope="scope">
              <el-button size="min" type="primary" @click="updataUser(scope.row)">修改</el-button>
              <el-button size="min" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            </template>


          </el-table-column>
        </el-table>
      </div>

      <div class="Pagination">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="getFyq">
        </el-pagination>
      </div>




    </div>
  </div>
</template>


<script>

import { GetUserList, CreateUser, updateUser, DeleteUser } from '@/api'


export default ({
  name: "U-ser",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birth: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
      },
      userList: [],//存放用户数据
      modaType: 0,// 0表示新增,

      // 分页器数据
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      }

    };
  },
  methods: {
    // 提交数据并且关闭按钮
    submitData() {
      //获取表单中的数据
      this.$refs.ruleForm.validate((volid) => {
        if (volid) {
          // 处理新增逻辑
          if (this.modaType == 0) {
            // 这里调用添加数据的接口
            CreateUser(this.ruleForm).then(res => {
              // 这里判断是否添加成功
              if (res.code == 20000) {
                //添加成功那么就进行获取新数据
                this.getUserList();
                // 清空表单的数据
                this.$refs.ruleForm.resetFields()
                // 关闭弹窗
                this.dialogVisible = false;

                return false;

              } else {
                return alert("添加失败哦")
              }

            })
          } else if (this.modaType == 1) {

            console.log()
            // 处理更新用户数据
            updateUser(this.ruleForm).then(value => {
              // 更新数据
              this.getUserList();

              // 关闭弹窗并清除数据
              this.handleClose()
            })

          }
        }


      })

    },
    //关闭弹窗的是时候重置input
    handleClose(done) {
      // 清空表单数据
      this.$refs.ruleForm.resetFields()
      // 关闭弹窗
      this.dialogVisible = false;
    },
    // 处理显示性别
    chuliSex(reow, column, index, s) {
      if (reow.sex == 0) {
        return "女"
      } else {
        return "男"
      }
    },
    // 获取数据列表
    getUserList(types = 0) {

      if (types == 1) {
        return GetUserList({ ...this.pageData, ...this.ruleForm }).then(value => {
          console.log(value)
          // 将总条数
          this.total = value.count || 0
          this.userList = value.list
        })

      } else if (types == 0) {
        return GetUserList({ ...this.pageData }).then(value => {
          console.log(value)
          // 将总条数
          this.total = value.count || 0
          this.userList = value.list
        })

      }



    },



    // 新增用户
    handerADD() {
      // 0表示新增
      this.modaType = 0;
      this.dialogVisible = true
    },
    // 修改数据模块 将参数转换成数据之后再进行传递
    updataUser(row) {
      this.modaType = 1;//按钮类型修改为1
      this.dialogVisible = true;//开启弹窗
      this.ruleForm = JSON.parse(JSON.stringify(row));
    },
    // 删除数据
    deleteUser(row) {
      // 显示弹窗框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteUser({ id: row.id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 分页器数据
    getFyq(value) {
      // 修改当前的页码
      console.log(value)
      this.pageData.page = value;
      this.getUserList()
    },
    onSubmit() {
      // cosnole.log("1")
      this.getUserList(1)
    }

  },


  mounted() {
    this.getUserList()
  }




})

</script>



<style scoped lang="less">
#User {
  * {
    // border: 1px solid red;
  }


  // 总内容
  .add_input {


    // 搜索模块
    .input-add-search {
      height: 40px;
      display: flex;
      border-bottom: 1px solid rgb(173, 173, 173);
      padding: 10px;
      // border: 1px solid red;
      justify-content: space-between;

      div:nth-child(1) {
        // background: red;
      }

      div:nth-child(2) {
        display: flex;
        justify-content: space-between;
        // background: red;
      }

      .addUser {
        margin-left: 20px;
      }
    }


    // 表格模块
    .user-list {
      width: 100%;
      height: 100%;
      margin-top: 10px;

      .el-table {
        height: 700px;
        margin: 0 auto;
        overflow: auto;
        // border: 1px solid red;

      }



    }


    // 分页器模块
    .Pagination {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      // border: 1px solid red;

      .el-pagination {
        padding: 20px;
        margin: 0 auto;
      }
    }





  }





}
</style>