<template>
  <div class="tag">
    <el-tag v-for="(item, index) in crumbs" @click="tagChange(item)" :key="item.label"
      :effect="$route.name == item.name ? 'dark' : 'plain'" closable @close="handleClose(item, index)">
      {{ item.label }}
    </el-tag>
  </div>
</template >

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "Tag",
  computed: {
    ...mapState('header', ["crumbs"])
  },
  methods: {
    ...mapActions('header', ["DeleteCrumbs"]),

    // 跳转
    tagChange(item) {
      this.$router.push({ name: item.name })
    },


    // 删除tag
    handleClose(item, index) {

      if (item.name == "home") {
        return
      }



      this.DeleteCrumbs(item)
      // 获取当前数据的个数
      let tagLength = this.crumbs.length;
      console.log(tagLength, index)






      // 这里判断是删除的元素不等于当前路由的
      if (item.name != this.$route.name) {
        return
      }


      // 删除的是最后一项
      if (index == tagLength) {
        this.$router.push({
          name: this.crumbs[index - 1].name
        })

        // 删除的中间
      } else {
        this.$router.push({
          name: this.crumbs[index].name
        })
      }



    }


  }


}
</script>



<style lang="less" scoped>
.tag {
  // border: 1px solid red;
padding: 10px;
  span {
    margin-left: 10px;
  }
}
</style>


