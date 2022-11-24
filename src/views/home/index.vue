<template>
  <div id="Home">
    <!-- <h1>首页首页首页首页首页</h1> -->


    <el-row>
      <!-- 左侧布局 -->
      <el-col :span="8">
        <!-- 个人信息 卡片 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <img src="https://img2.baidu.com/it/u=2360330494,1092108791&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
              alt="">
            <div class="Usertitle">
              <p>Admin</p>
              <p>普通用户</p>
            </div>
          </div>
          <div class="usertext">
            <ul>
              <li><span>上次登录时间：</span><span>2021-7-19</span></li>
              <li><span>上次登录地点：</span><span>赣州</span></li>
            </ul>
          </div>
        </el-card>
        <!-- 品牌数据 卡片 -->
        <el-card class="box-cardb">
          <el-table :data="tableData" class="table-box">
            <el-table-column v-for="(val, key) in tableTitles" :prop="key" :label="val" :key="val">
            </el-table-column>
          </el-table>
        </el-card>

      </el-col>

      <!-- 右侧布局-->
      <el-col :span="16">

        <!--  01：品牌卡片数据 -->
        <div class="colder">
          <div class="box-order" v-for="item in countData" :key="item.name">
            <el-card class="box-card">
              <!-- 卡片内容区域 -->
              <div class="carl">
                <!-- 右侧图标区域 -->
                <div class="carl-icon" :style="{ background: item.color }">
                  <i :class="`el-icon-${item.icon}`"></i>
                </div>

                <!--  支付数据  -->
                <div class="carl-data">
                  <p>￥201</p>
                  <p>今日支付订单</p>
                </div>

              </div>
            </el-card>
          </div>
        </div>

        <!--  02:图表数据 -->
        <div class="ectch">
          <div class="ectch-top">
            <el-card style="width:100%">
              <div ref="ectchA" class="ectchA"></div>
            </el-card>
          </div>

          <div class="ectch-bottom">
            <el-card>
              <div ref="ectchB" class="ectchB"></div>
            </el-card>

            <el-card>
              <div ref="ectchC" class="ectchC"></div>
            </el-card>
          </div>

        </div>

      </el-col>


    </el-row>
  </div>
</template>


<script>
import { GetHome } from '@/api'
import * as echarts from 'echarts';


export default ({
  name: "H-ome",


  data() {

    return {
      // 产品表格数据 标题
      tableTitles: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },

      // 左侧销量数据
      tableData: [],

      // 右侧订单数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],









    }
  },
  methods: {
    // 图表1
    readEctharA(res) {

      //-01 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.ectchA);

      //-02  指定图表的配置项和数据
      let ectchAoptions = {
        tooltip: {},
      };

      //结构出这折线统计图的数据
      let { orderData } = res.data;
      //遍历出所有的属性名称 并添加到配置项中
      let xAxis = Object.keys(orderData.data[0])
      ectchAoptions.xAxis = {
        data: xAxis
      }
      ectchAoptions.legend = {
        data: xAxis
      }


      ectchAoptions.yAxis = {};
      ectchAoptions.series = []
      xAxis.forEach(keys => {
        ectchAoptions.series.push({
          name: keys,
          type: 'line',
          data: orderData.data.map(item => {
            return item[keys]
          }),
        })
      })

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(ectchAoptions);
    },
    // 图表2
    readEctharB(res) {

      let { userData } = res.data;

      let myChart = echarts.init(this.$refs.ectchB);

      //配置项
      let ectchBoptions = {
        tooltip: {},
        yAxis: {},
      };


      let xAxis = userData.map(item => {
        return item.date
      });

      ectchBoptions.legend = {
        data: ["新增用户", "活跃用户"]
      };
      ectchBoptions.xAxis = {
        data: xAxis
      }

      ectchBoptions.color = ["#2ec7c9", "#b6a2de"]
      ectchBoptions.series = [

        {
          name: '新增用户',
          type: 'bar',
          data: userData.map(item => item.new)
        },
        {
          name: '活跃用户',
          type: 'bar',
          data: userData.map(item => item.active)
        }
      ]

      myChart.setOption(ectchBoptions)

    },
    // 图表3
    readEctharC(res) {
      let { videoData } = res.data

      let myChart = echarts.init(this.$refs.ectchC);

      let optioNectchC = {
        aria: {
          show: true
        },
        title: {
          text: '某站点用户访问来源',
          x: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            data: videoData
          }
        ]
      };

      myChart.setOption(optioNectchC)
    },
  },

  mounted() {
    GetHome().then(res => {
      console.log(res)
      // 表格数据
      this.tableData = res.data.tableData;

      // 调用图表函数渲染图表
      this.readEctharA(res)
      this.readEctharB(res)
      this.readEctharC(res)

    })




  },



})

</script>



<style scoped lang="less">
//第一个卡片
.box-card {
  margin-left: 20px;

  //头部内容
  .clearfix {
    height: 200px;
    display: flex;

    img {
      display: block;
      width: 150px;
      height: 150px;
      border-radius: 100px;
    }

    .Usertitle {
      padding-left: 56px;
    }

    .Usertitle p:nth-child(1) {
      font-size: 30px;
    }
  }


  //底部内容
  .usertext {
    ul {
      li {
        list-style: none;
        line-height: 30px;
      }

      li span:nth-child(1) {
        color: gray;
      }

      li span:nth-child(2) {
        padding-left: 50px;
        font-weight: 900;

      }
    }
  }



}

// <!-- 品牌数据 卡片 -->
.box-cardb {
  margin-left: 20px;
  margin-top: 30px;

  .table-box {
    width: 100%;
    height: 410px;
  }
}

//上面卡片数据
.colder {
  height: 320px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // border: 1px solid rgb(0, 247, 255);
  margin: 0px 20px 0px;
  // padding: 10px;



  // 右侧布局
  .box-order {
    // border: 1px solid red;
    width: 30%;

    //卡片区域
    .box-card {
      overflow: auto;
      margin-left: 0px;

      // width: 30%;
      //卡片主题内容区域
      .carl {
        display: flex;

        // 右侧图标区域
        .carl-icon {
          width: 100px;
          // text-align: center;
          line-height: 100px;
          height: 100px;
          font-size: 40px;
          color: #fff;
        }


        // 右侧文字数据
        .carl-data {
          padding-left: 10px;
          line-height: 10px;
        }

        .carl-data p:nth-child(1) {
          font-size: 30px;
        }

        .carl-data p:nth-child(2) {
          font-size: 14px;
        }



      }

    }
  }
}







// 图表数据
.ectch {
  // border: 1px solid red;
  margin: 10px 20px 0px;




  // 第一个ectch 折线图
  .ectch-top {
    height: 240px;
    display: flex;
    flex-wrap: wrap;

    .el-card {
      height: 270px;
      // border: 1px solid red;

      .ectchA {
        height: 240px;
        // border: 1px solid red;


      }
    }
  }



  // 第二个ectch 图表

  .ectch-bottom {
    height: 240px;
    display: flex;
    justify-content: space-between;
    margin: 50px 0px 0px;

    .el-card {
      width: 48%;

      .ectchB {
        height: 240px;
        // background: red;

      }

      .ectchC {
        height: 240px;
        // background: red;
      }



    }
  }





}
</style>


